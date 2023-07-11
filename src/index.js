const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', async (req, res) => {

    res.json({ "estado": 1, "mensaje": "Correo Enviado, su dispositivo ha sido registrado exitosamente." });
});
app.post('/senmailintidev', (req, res) => {

    var nombre = req.body.nombreintidev;
    var email = req.body.emailintidev;
    var asunto = req.body.asuntointidev;
    var telefono = req.body.telefonointidev;
    var mensaje = req.body.mensajeintidev;
    var listaError = [];

    if ((nombre === null || nombre.trim() === '')) {
        listaError.push('nombre');
    }
    if (email === null || email.trim() === '') {
        listaError.push('email');
    }
    if (asunto === null || asunto.trim() === '') {
        listaError.push('asunto');
    }

    if (mensaje === null || mensaje.trim() === '') {
        listaError.push('mensaje');
    }
    if (listaError.length > 0) {
        res.json({ "estado": 0, "mensaje": listaError });
    }


    if (telefono === null || telefono.trim() === '') {
        telefono = telefono + " - sin datos";
    }
    nombre = nombre.toUpperCase();
    email = email.toUpperCase();
    var message = {
        from: "intidev.des@gmail.com",
        to: "intidev.info@gmail.com",
        subject: `${asunto}- ${nombre}`,
        text: "Plaintext version of the message",
        html: `<h1 style="color: #5e9ca0;">El trabajo nos llama!</h1><h2>El cliente <span style="color: #008080;"><strong>${nombre}</strong></span> con el correo <span style="color: #008080;"><strong>${email}</strong></span> a solicitado informaci&oacute;n con los siguientes datos:</h2><table style="border-collapse: collapse; width: 100%; height: 54px;" border="1"><tbody><tr style="height: 18px;"><td style="width: 17.1875%; height: 18px;"><strong>Asunto&nbsp;</strong></td><td style="width: 82.8125%; height: 18px;">${asunto}</td></tr><tr style="height: 18px;"><td style="width: 17.1875%; height: 18px;"><strong>Mensaje</strong></td><td style="width: 82.8125%; height: 18px;">${mensaje}</td></tr><tr style="height: 18px;"><td style="width: 17.1875%; height: 18px;"><strong>Telefono</strong></td><td style="width: 82.8125%; height: 18px;">${telefono}</td></tr></tbody></table><p>&nbsp;</p><p><strong>&nbsp;</strong></p>`
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'intidev.des@gmail.com',
            pass: 'lfnf ahhs usii izuv'
        }
    })
    transporter.sendMail(message, (error, info) => {
        if (error) {
            res.json({ "estado": 0, "mensaje": "error al enviar corre" });
        } else {
            res.json({ "estado": 1, "mensaje": "correo Enviado!!" });
        }
    })
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor ON ${port}`);
});

