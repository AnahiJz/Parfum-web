const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND contrasena_hash = ?';
        const [rows] = await db.query(query, [username, password]);

        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
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
            [userId, total, total, 'Dirección predeterminada del cliente', 'pagado']
        );

        const orderId = orderResult.insertId;

        const orderDetails = cart.map(item => [
            orderId,
            item.id,
            item.name,
            item.quantity,
            item.price
        ]);

        await connection.query(
            'INSERT INTO pedido_detalle (pedido_id, producto_id, nombre_producto, cantidad, precio_unitario) VALUES ?',
            [orderDetails]
        );

        await connection.commit();
        res.json({ success: true, orderId });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al procesar el pedido' });
    } finally {
        connection.release();
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
            res.status(500).json({ success: false, message: 'No se pudo crear el usuario' });
        }
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ success: false, message: 'Este correo ya está registrado.' });
        } else {
            res.status(500).json({ success: false, message: 'Error del servidor al registrar.' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor seguro corriendo en: http://localhost:${PORT}`);
});