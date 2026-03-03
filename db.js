const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'shortline.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    // Aquí añadimos tu contraseña de vuelta como respaldo:
    password: process.env.DB_PASSWORD || 'mjwfMXWdctSyvlUjQSkeUNZXmCgimGaZ', 
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 59357,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;