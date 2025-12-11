const express = require('express');
const path = require('path');
const db = require('./db');
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51SZYglRZm8Mvgir84MxI24RdjOPVUUZbLFkrV88FiTfo10wcmp9JCAKgHE8vLtBZvEI1xj4XSrCQjumxVtjmrTiE00oL99z3Xt'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djassojimenez@gmail.com',
        pass: 'cerc xncl dvgw nfvi'
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const query = `
            SELECT p.*, g.nombre as nombre_genero, t.nombre as nombre_tipo 
            FROM productos p
            LEFT JOIN generos g ON p.genero_id = g.id
            LEFT JOIN tipos_perfume t ON p.tipo_id = t.id
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
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
    const { username, password } = req.body;
    try {
        const query = 'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND contrasena_hash = ?';
        const [rows] = await db.query(query, [username, password]);
        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena_hash, rol) VALUES (?, ?, ?, "usuario")',
            [name, email, password]
        );
        if (result.insertId) {
            res.json({ success: true, userId: result.insertId });
        } else {
            res.status(500).json({ success: false, message: 'Error al crear usuario' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al registrar' });
    }
});

app.post('/api/admin/create', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena_hash, rol) VALUES (?, ?, ?, ?)',
            [name, email, password, role || 'admin']
        );
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al crear admin' });
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:3000/success.html?orderId=${orderId}`,
            cancel_url: `http://localhost:3000/cancel.html`,
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
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.cantidad}</td>
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
                                <th style="padding: 10px; text-align: left;">Cant.</th>
                                <th style="padding: 10px; text-align: left;">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    
                    <h2 style="text-align: right; color: #d4af37;">Total: $${order.total}</h2>
                    
                    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p style="margin: 0; font-size: 14px;">
                            <strong>📢 IMPORTANTE:</strong><br>
                            Conserva este ticket. Será solicitado al momento de la entrega de tus productos o para cualquier reclamo o devolución.
                        </p>
                    </div>
                </div>
                <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
                    © 2025 Parfum Luxury Fragrances. Todos los derechos reservados.
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: '"Parfum Luxury Fragrances" <djassojimenez@gmail.com>',
            to: user.correo, 
            subject: `Ticket de Compra #${orderId} - Parfum`,
            html: emailHtml
        });

        console.log(`📧 Correo enviado a ${user.correo}`);
        res.json({ success: true });

    } catch (error) {
        console.error("Error en proceso post-compra:", error);
        res.status(500).json({ success: false, message: 'Error procesando orden' });
    }
});

app.post('/api/admin/products', async (req, res) => {
    const { name, price, stock, image, gender, type, rating } = req.body;

    const generoId = (gender === 'hombre') ? 1 : (gender === 'mujer' ? 2 : 3);
    const tipoId = (type === 'niche') ? 2 : 1;
    const marcaId = 1;
    const familiaId = 1;
    const descripcion = `Fragancia ${name} del tipo ${type}`; 

    try {
        const query = `
            INSERT INTO productos 
            (nombre, descripcion, precio, stock, marca_id, genero_id, tipo_id, familia_id, imagen_principal, calificacion, texto_insignia, es_popular) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, descripcion, price, stock, marcaId, generoId, tipoId, familiaId, image, rating || 5.0, '', 0];
        await db.query(query, values);
        res.json({ success: true, message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error("Error al crear:", error);
        res.status(500).json({ success: false, message: 'Error en BD: ' + error.message });
    }
});

app.put('/api/admin/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, image, gender, type } = req.body;
    const generoId = (gender === 'hombre') ? 1 : (gender === 'mujer' ? 2 : 3);
    const tipoId = (type === 'niche') ? 2 : 1;

    try {
        const query = `UPDATE productos SET nombre=?, precio=?, stock=?, genero_id=?, tipo_id=?, imagen_principal=? WHERE id=?`;
        const values = [name, price, stock, generoId, tipoId, image, id];
        await db.query(query, values);
        res.json({ success: true, message: 'Producto actualizado' });
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ success: false, message: 'Error al actualizar' });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'No se puede eliminar (puede tener ventas asociadas)' });
    }
});

app.put('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        let query;
        let values;
        if (password && password.trim() !== '') {
            query = 'UPDATE usuarios SET nombre = ?, correo = ?, contrasena_hash = ? WHERE id = ?';
            values = [name, email, password, id];
        } else {
            query = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?';
            values = [name, email, id];
        }
        const [result] = await db.query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.json({ success: true, message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ success: false, message: 'Error en base de datos: ' + error.message });
    }
});

app.delete('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});