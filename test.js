require('dotenv').config();

const db = require('./db'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // Requerido por Gmail
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

        console.log(`⏳ Intentando enviar un correo de prueba a tu propia cuenta (${process.env.EMAIL_USER})...`);
        await transporter.sendMail({
            from: `"Parfum Security Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: '✅ Prueba de Correo Exitosa - Parfum',
            html: '<h2>¡Felicidades!</h2><p>Si estás leyendo esto, significa que Nodemailer y tu contraseña de aplicación de Gmail están configurados correctamente.</p>'
        });
        console.log(`✅ ¡Correo de prueba enviado con éxito! Por favor, revisa tu bandeja de entrada y la carpeta de Spam de ${process.env.EMAIL_USER}.`);
    } catch (error) {
        console.error("❌ Error conectando al correo:");
        console.error(error.message);
    }

    console.log("\n🏁 Pruebas finalizadas.");
    process.exit(); 
}

probarConexiones();