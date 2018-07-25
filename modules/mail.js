/* global email, config */
let nodemailer = require('nodemailer'),
    utils = {};

/**
 * @description verifica si el usuario tiene asignado un determinado permiso
 * @param {String} permission un string con el nombre del permiso que se va a verificar
 * @param {User} user una isntancia del usuario que se va a verificar
 * @returns {boolean} devuelve true si el usuario tiene el permiso, y fal en cualquier otro caso
 * */
utils.send = (to, subject, message, isHtml = false) => {
    return new Promise((resolve, reject) => {
        let mailOptions = { from: config.mail.user, to: to, subject: subject };

        let transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.mail.user,
                pass: config.mail.password
            }
        });

        if (isHtml)
            mailOptions.html = message;
        else
            mailOptions.text = message;

        // send mail with defined transport object
        transport.sendMail(mailOptions, (error, response) => {
            if (error)
                reject(response.reject);
            else {
                let arrResponse = response.response ? response.response.split(' ') : false;

                if (arrResponse && arrResponse[0] === "250")
                    resolve(true);
                else
                    reject(response.reject);
            }
            transport.close();
        });
    });
};

module.exports = utils;