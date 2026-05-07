const mysql = require('mysql2/promise');
const fs = require('fs');

const config = {
    host: 'shortline.proxy.rlwy.net',
    port: 59357,
    user: 'root',
    password: 'mjwfMXWdctSyvlUjQSkeUNZXmCgimGaZ',
    database: 'railway',
    multipleStatements: true,
    ssl: { rejectUnauthorized: false }
};

(async () => {
    console.log("🚀 Conectando a Railway...");
    try {
        const connection = await mysql.createConnection(config);
        
        console.log("🔧 Desactivando restricciones de seguridad temporales...");
        await connection.query('SET FOREIGN_KEY_CHECKS = 0'); 

        console.log("✅ Conectado! Leyendo backup.sql...");
        const sql = fs.readFileSync('backup.sql', 'utf8');
        
        console.log("📤 Subiendo datos...");
        await connection.query(sql);
        
        console.log("🔧 Reactivando restricciones...");
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log("🎉 ¡LISTO! Base de datos actualizada en la nube.");
        await connection.end();
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
})();