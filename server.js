require('dotenv').config();
console.log("LLAVE STRIPE:", process.env.STRIPE_SECRET_KEY);
const express = require('express');
const path = require('path');
const db = require('./db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_para_evitar_crasheos';
const stripe = require('stripe')(stripeKey);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

(async function initDB() {
    try {
        await db.query("ALTER TABLE usuarios ADD COLUMN email_verificado BOOLEAN DEFAULT FALSE;");
        await db.query("ALTER TABLE usuarios ADD COLUMN codigo_verificacion VARCHAR(10);");
        console.log("✅ Columnas de verificación añadidas a DB.");
    } catch(e) {
        if (e.code !== 'ER_DUP_FIELDNAME') console.error("⚠️ Error en initDB:", e.message);
    }

    try {
        await db.query("UPDATE usuarios SET email_verificado = 1, contrasena_hash = '12345' WHERE correo = 'admin@parfum.com'");
    } catch(e) {
        console.error("⚠️ Error marcando admin como verificado:", e.message);
    }
})();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // Requerido por Gmail en el puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const query = 'SELECT * FROM productos';
        const [rows] = await db.query(query);
        
        res.json(rows);
    } catch (error) {
        console.error("🚨 ERROR EN PRODUCTOS:", error);
        res.status(500).json({ error: 'Error SQL: ' + error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const query = 'SELECT id, nombre, correo, rol, fecha_creacion FROM usuarios';
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

app.get('/api/admin/sales', async (req, res) => {
    try {
        const query = `
            SELECT p.id, u.nombre as cliente, p.total, p.estado, p.fecha_creacion 
            FROM pedidos p
            JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.fecha_creacion DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
});

app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [cart] = await db.query('SELECT id FROM carritos WHERE usuario_id = ?', [userId]);
        if (cart.length === 0) return res.json([]);
        const cartId = cart[0].id;
        const query = `
            SELECT p.id, p.nombre as name, p.precio as price, p.imagen_principal as image, ci.cantidad as quantity
            FROM carrito_items ci
            JOIN productos p ON ci.producto_id = p.id
            WHERE ci.carrito_id = ?
        `;
        const [items] = await db.query(query, [cartId]);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener carrito' });
    }
});

app.get('/api/admin/catalogs', async (req, res) => {
    try {
        const [brands] = await db.query('SELECT * FROM marcas ORDER BY nombre');
        res.json({ brands });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener catálogos' });
    }
});

app.post('/api/login', async (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    try {
        const query = 'SELECT id, nombre, correo, rol, email_verificado FROM usuarios WHERE correo = ? AND contrasena_hash = ?';
        const [rows] = await db.query(query, [username, password]);
        
        if (rows.length > 0) {
            // Permitimos el acceso directo si es la cuenta admin@parfum.com o si tiene rol de administrador
            if (rows[0].email_verificado === 0 && rows[0].correo !== 'admin@parfum.com' && rows[0].rol !== 'admin') {
                return res.status(401).json({ success: false, requireVerification: true, email: rows[0].correo, message: 'Debes verificar tu correo antes de ingresar.' });
            }
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error("🚨 ERROR EN LOGIN:", error);
        res.status(500).json({ success: false, message: 'Error SQL: ' + error.message });
    }
});

app.post('/api/logout', (req, res) => {
    res.json({ success: true });
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Correo electrónico inválido' });
    }

    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena_hash, rol, codigo_verificacion) VALUES (?, ?, ?, "usuario", ?)',
            [name, email, password, verificationCode]
        );
        if (result.insertId) {
            try {
                console.log(`⏳ Intentando enviar correo a: ${email}...`);
                await transporter.sendMail({
                    from: `"Parfum Security" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: 'Verifica tu cuenta en Parfum',
                    html: `<h2>¡Hola ${name}!</h2><p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`
                });
                console.log(`✅ Correo enviado con éxito a ${email}`);
            } catch (mailError) {
                console.error("🚨 Error CRÍTICO al enviar email:", mailError.message);
            }
            res.json({ success: true, requireVerification: true, email });
        } else {
            res.status(500).json({ success: false, message: 'Error al crear usuario' });
        }
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Este correo ya está registrado.' });
        }
        res.status(500).json({ success: false, message: 'Error al registrar' });
    }
});

app.post('/api/verify-email', async (req, res) => {
    const { email, code } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ? AND codigo_verificacion = ?', [email, code]);
        if (rows.length > 0) {
            await db.query('UPDATE usuarios SET email_verificado = true, codigo_verificacion = NULL WHERE id = ?', [rows[0].id]);
            const updatedUser = { id: rows[0].id, nombre: rows[0].nombre, correo: rows[0].correo, rol: rows[0].rol };
            res.json({ success: true, user: updatedUser });
        } else {
            res.status(400).json({ success: false, message: 'Código incorrecto o expirado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error de servidor al verificar.' });
    }
});

app.post('/api/resend-verification', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Correo requerido' });

    try {
        const [rows] = await db.query('SELECT nombre, email_verificado FROM usuarios WHERE correo = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        if (rows[0].email_verificado) return res.status(400).json({ success: false, message: 'La cuenta ya está verificada' });

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await db.query('UPDATE usuarios SET codigo_verificacion = ? WHERE correo = ?', [verificationCode, email]);

        console.log(`⏳ Intentando reenviar correo a: ${email}...`);
        await transporter.sendMail({
            from: `"Parfum Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Nuevo código de verificación - Parfum',
            html: `<h2>¡Hola ${rows[0].nombre}!</h2><p>Tu nuevo código de verificación es: <strong>${verificationCode}</strong></p>`
        });
        console.log(`✅ Correo reenviado con éxito a ${email}`);

        res.json({ success: true, message: 'Código reenviado exitosamente. Revisa tu bandeja de entrada o carpeta de Spam.' });
    } catch (error) {
        console.error('Error reenviando código:', error);
        res.status(500).json({ success: false, message: 'Error interno al reenviar el código' });
    }
});

app.post('/api/admin/create', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena_hash, rol, verificado) VALUES (?, ?, ?, ?, 1)',
            [name, email, password, role || 'admin']
        );
        res.json({ success: true });
    } catch (error) {
        console.error("🚨 Error exacto en BD al crear admin:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Este correo ya está registrado.' });
        }
        res.status(500).json({ success: false, message: 'Error interno de la base de datos.' });
    }
});

app.post('/api/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let [cart] = await db.query('SELECT id FROM carritos WHERE usuario_id = ?', [userId]);
        let cartId;
        if (cart.length === 0) {
            const [result] = await db.query('INSERT INTO carritos (usuario_id) VALUES (?)', [userId]);
            cartId = result.insertId;
        } else {
            cartId = cart[0].id;
        }
        const [existingItem] = await db.query('SELECT cantidad FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', [cartId, productId]);
        if (existingItem.length > 0) {
            await db.query('UPDATE carrito_items SET cantidad = cantidad + ? WHERE carrito_id = ? AND producto_id = ?', [quantity, cartId, productId]);
        } else {
            await db.query('INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [cartId, productId, quantity]);
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/cart/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const [cart] = await db.query('SELECT id FROM carritos WHERE usuario_id = ?', [userId]);
        if (cart.length === 0) return res.status(404).json({});
        const cartId = cart[0].id;
        if (quantity <= 0) {
            await db.query('DELETE FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', [cartId, productId]);
        } else {
            await db.query('UPDATE carrito_items SET cantidad = ? WHERE carrito_id = ? AND producto_id = ?', [quantity, cartId, productId]);
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const [cart] = await db.query('SELECT id FROM carritos WHERE usuario_id = ?', [userId]);
        if (cart.length > 0) {
            await db.query('DELETE FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', [cart[0].id, productId]);
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/checkout', async (req, res) => {
    const { userId, cart, total } = req.body;
    if (!userId || !cart || cart.length === 0) {
        return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const [orderResult] = await connection.query(
            'INSERT INTO pedidos (usuario_id, subtotal, total, direccion_envio, estado) VALUES (?, ?, ?, ?, ?)',
            [userId, total, total, 'Dirección por definir en pago', 'pendiente']
        );
        const orderId = orderResult.insertId;
        const orderDetails = cart.map(item => [orderId, item.id, item.name, item.quantity, item.price]);
        await connection.query(
            'INSERT INTO pedido_detalle (pedido_id, producto_id, nombre_producto, cantidad, precio_unitario) VALUES ?',
            [orderDetails]
        );
        await connection.commit();
        const line_items = cart.map(item => ({
            price_data: {
                currency: 'mxn',
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.get('host');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${protocol}://${host}/success.html?orderId=${orderId}`,
            cancel_url: `${protocol}://${host}/cancel.html`,
        });
        res.json({ success: true, url: session.url });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al procesar pago' });
    } finally {
        connection.release();
    }
});

app.post('/api/paypal/create-pending-order', async (req, res) => {
    const { userId, cart, total } = req.body;
    if (!userId || !cart || cart.length === 0) {
        return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const [orderResult] = await connection.query(
            'INSERT INTO pedidos (usuario_id, subtotal, total, direccion_envio, estado) VALUES (?, ?, ?, ?, ?)',
            [userId, total, total, 'Pago vía PayPal', 'pendiente']
        );
        const orderId = orderResult.insertId;
        const orderDetails = cart.map(item => [orderId, item.id, item.name, item.quantity, item.price]);
        await connection.query(
            'INSERT INTO pedido_detalle (pedido_id, producto_id, nombre_producto, cantidad, precio_unitario) VALUES ?',
            [orderDetails]
        );
        await connection.commit();
        res.json({ success: true, orderId: orderId });
    } catch (error) {
        await connection.rollback();
        console.error("Error guardando orden de PayPal:", error);
        res.status(500).json({ success: false, message: 'Error al procesar pedido' });
    } finally {
        connection.release();
    }
});

app.post('/api/order/success', async (req, res) => {
    const { orderId, userId } = req.body;
    try {
        await db.query('UPDATE pedidos SET estado = "pagado" WHERE id = ?', [orderId]);
        const [cart] = await db.query('SELECT id FROM carritos WHERE usuario_id = ?', [userId]);
        
        if (cart.length > 0) {
            await db.query('DELETE FROM carrito_items WHERE carrito_id = ?', [cart[0].id]);
        }
        
        const [userRows] = await db.query('SELECT nombre, correo FROM usuarios WHERE id = ?', [userId]);
        const user = userRows[0];
        
        const [orderRows] = await db.query('SELECT total, fecha_creacion FROM pedidos WHERE id = ?', [orderId]);
        const order = orderRows[0];
        
        const [detailsRows] = await db.query('SELECT nombre_producto, cantidad, precio_unitario FROM pedido_detalle WHERE pedido_id = ?', [orderId]);
        
        const itemsHtml = detailsRows.map(item => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.nombre_producto}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.cantidad}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.precio_unitario}</td>
            </tr>
        `).join('');

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px;">
                <div style="background-color: #d4af37; padding: 20px; text-align: center; color: white;">
                    <h1 style="margin: 0;">Parfum - Confirmación de Compra</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Hola <strong>${user.nombre}</strong>,</p>
                    <p>¡Gracias por tu compra! Este es tu comprobante oficial.</p>
                    <h3 style="color: #d4af37;">Ticket #${orderId}</h3>
                    <p>Fecha: ${new Date(order.fecha_creacion).toLocaleDateString()}</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #f9f9f9;">
                                <th style="padding: 10px; text-align: left;">Producto</th>
                                <th style="padding: 10px; text-align: center;">Cant.</th>
                                <th style="padding: 10px; text-align: left;">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    <h2 style="text-align: right; color: #d4af37;">Total: $${order.total}</h2>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"Parfum Luxury Fragrances" <${process.env.EMAIL_USER}>`,
            to: user.correo, 
            subject: `Ticket de Compra #${orderId} - Parfum`,
            html: emailHtml
        });
        
        res.json({ success: true });
        
    } catch (error) {
        console.error("Error al procesar order/success y enviar correo:", error);
        res.status(500).json({ success: false, message: "Error interno al procesar el pago y correo" });
    }
});

app.post('/api/admin/products', async (req, res) => {
    const { name, price, stock, image, gender, type, rating } = req.body;
    const generoId = (gender === 'hombre') ? 1 : (gender === 'mujer' ? 2 : 3);
    const tipoId = (type === 'niche') ? 2 : 1;
    try {
        const query = `
            INSERT INTO productos 
            (nombre, descripcion, precio, stock, marca_id, genero_id, tipo_id, familia_id, imagen_principal, calificacion, texto_insignia, es_popular) 
            VALUES (?, ?, ?, ?, 1, ?, ?, 1, ?, ?, '', 0)
        `;
        await db.query(query, [name, `Fragancia ${name}`, price, stock, generoId, tipoId, image, rating || 5.0]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.put('/api/admin/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, image, gender, type } = req.body;
    const generoId = (gender === 'hombre') ? 1 : (gender === 'mujer' ? 2 : 3);
    const tipoId = (type === 'niche') ? 2 : 1;
    try {
        const query = `UPDATE productos SET nombre=?, precio=?, stock=?, genero_id=?, tipo_id=?, imagen_principal=? WHERE id=?`;
        await db.query(query, [name, price, stock, generoId, tipoId, image, id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.put('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    try {
        let query = password && password.trim() !== '' 
            ? 'UPDATE usuarios SET nombre = ?, correo = ?, contrasena_hash = ?, rol = ? WHERE id = ?' 
            : 'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?';
        let values = password && password.trim() !== '' 
            ? [name, email, password, role || 'usuario', id] 
            : [name, email, role || 'usuario', id];
        await db.query(query, values);
        res.json({ success: true });
    } catch (error) {
        console.error("🚨 Error al actualizar usuario:", error);
        res.status(500).json({ success: false });
    }
});

app.delete('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/contact', async (req, res) => {
    const { contactName, contactEmail, contactMessage, honeypot } = req.body;

    // Campo honeypot para detectar bots. Si tiene valor, es un bot.
    if (honeypot) {
        console.log('🍯 Honeypot activado. Envío de formulario bloqueado.');
        // Respondemos con éxito para engañar al bot, pero no hacemos nada.
        return res.json({ success: true, message: 'Mensaje enviado correctamente' });
    }

    if (!contactName || !contactEmail || !contactMessage) {
        return res.status(400).json({ success: false, message: 'Faltan campos por completar' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
        return res.status(400).json({ success: false, message: 'El correo electrónico proporcionado no es válido' });
    }

    try {
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px;">
                <div style="background-color: #d4af37; padding: 20px; text-align: center; color: white;">
                    <h1 style="margin: 0;">Nuevo Mensaje de Contacto - ParfumWeb</h1>
                </div>
                <div style="padding: 20px;">
                    <p><strong>De:</strong> ${contactName} (${contactEmail})</p>
                    <p><strong>Asunto:</strong> Quejas y Sugerencias</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <h3 style="color: #d4af37;">Mensaje:</h3>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37;">${contactMessage}</p>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"Parfum Web Contacto" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // El destino ahora es manejado de forma segura en el backend
            replyTo: contactEmail,
            subject: `Nuevo mensaje de ${contactName} - Parfum Contacto`,
            html: emailHtml
        });

        res.json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error enviando el correo de contacto:', error);
        res.status(500).json({ success: false, message: 'Hubo un error al enviar el mensaje' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visita: http://localhost:${PORT}`);
});