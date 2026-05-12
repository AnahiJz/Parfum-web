require('dotenv').config();

const db = require('./db'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function probarConexiones() {
    console.log("⏳ Iniciando pruebas de conexión para ParfumWeb...\n");

    try {
        console.log("🟡 Probando conexión a MySQL...");
        await db.query('SELECT 1 + 1 AS resultado');
        console.log("✅ ¡Base de datos conectada exitosamente!");
    } catch (error) {
        console.error("❌ Error en la Base de Datos:");
        console.error(error.message);
    }

    console.log("-----------------------------------");

    try {
        console.log("🟡 Probando conexión al servidor de correos (Gmail)...");
        await transporter.verify();
        console.log("✅ ¡Nodemailer está listo para enviar correos!");
    } catch (error) {
        console.error("❌ Error conectando al correo:");
        console.error(error.message);
    }

    console.log("\n🏁 Pruebas finalizadas.");
    process.exit(); 
}

probarConexiones();