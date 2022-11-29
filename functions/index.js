const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: "mail.narativ.agency",
    port: 465,
    secure: true,
    auth: {
        user: 'kontakt@ibcard.info',
        pass: 'h7ax7kxzHloZ'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { email, message } = req.body

        const mailOptions = {
            from: email, // Something like: Jane Doe <janedoe@gmail.com>
            to: 'peric.bojan87@gmail.com',
            subject: 'TapApp contact form', // email subject
            html: `
            <h1>Message from: ${email}</h1>
            <p>
                ${message}
            </p>
            ` // email content in HTML
        };

        transporter.verify((error, success) => {
            if (error) {
                return res.send({ success: false, message: error });
            } else {

                return transporter.sendMail(mailOptions, (erro, info) => {
                    if (erro) {
                        return res.send({ success: false, message: erro.toString() });
                    }
                    return res.send({ success: true, message: 'Sended' });
                });
            }
        })
        // returning result
    });
});

