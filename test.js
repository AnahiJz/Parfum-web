// Cargar las variables del .env primero que nada
require('dotenv').config();

// Importar tus configuraciones exactas
const db = require('./db'); 
const transporter = require('./config/mailer');

async function probarConexiones() {
    console.log("⏳ Iniciando pruebas de conexión para ParfumWeb...\n");

    // --- PRUEBA 1: BASE DE DATOS ---
    try {
        console.log("🟡 Probando conexión a MySQL...");
        // Hacemos una consulta súper básica para ver si responde
        await db.query('SELECT 1 + 1 AS resultado');
        console.log("✅ ¡Base de datos conectada exitosamente!");
    } catch (error) {
        console.error("❌ Error en la Base de Datos:");
        console.error(error.message);
    }

    console.log("-----------------------------------");

    // --- PRUEBA 2: CORREOS (NODEMAILER) ---
    try {
        console.log("🟡 Probando conexión al servidor de correos (Gmail)...");
        // verify() comprueba que el usuario y la contraseña de aplicación sean válidos
        await transporter.verify();
        console.log("✅ ¡Nodemailer está listo para enviar correos!");
    } catch (error) {
        console.error("❌ Error conectando al correo:");
        console.error(error.message);
    }

    console.log("\n🏁 Pruebas finalizadas.");
    process.exit(); // Termina la ejecución del script
}

probarConexiones();