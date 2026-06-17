const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendClientDelivery(clientEmail, projectName, downloadLink) {
    console.log(`📧 [MAILER] Dispatching secure delivery link to ${clientEmail}...`);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.STUDIO_EMAIL, pass: process.env.STUDIO_EMAIL_APP_PASSWORD }
    });

    await transporter.sendMail({
        from: '"Kellar-Studio Automation" <hello@kellarstudio.com>',
        to: clientEmail,
        subject: `[FINAL DELIVERY] ${projectName} - Kellar-Studio`,
        html: `<h3>Your project is ready.</h3>
               <p>The final master for <b>${projectName}</b> has cleared QC.</p>
               <a href="${downloadLink}">Click here to download your assets.</a>
               <p><i>System generated message. Do not reply.</i></p>`
    });
}
module.exports = { sendClientDelivery };
