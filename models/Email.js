const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config({ path: './../config/config.env' });

class Email {
	constructor(messaggio) {
		this.messaggio = messaggio;
		this.alias = process.env.MITTENTE_ALIAS;
		this.mittente = process.env.MITTENTE;
		this.psw = process.env.MITTENTE_PSW;
		this.host = process.env.EMAIL_HOST;
		this.destinatario = process.env.DESTINATARIO;
		this.oggetto = process.env.OGGETTO;
		this.error;
	}

	setError(error) {
		this.error += error;
	}
	send() {
		return new Promise((resolve, reject) => {
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				host: `${this.host}`,
				port: 25,
				secure: false, // true for 465, false for other ports
				auth: {
					user: this.mittente, // generated ethereal user
					pass: this.psw, // generated ethereal password
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			// setup email data with unicode symbols
			let mailOptions = {
				from: `${this.alias} <${this.mittente}>`, // sender address
				to: `${this.destinatario}`, // list of receivers
				subject: `${this.oggetto} | ${this.alias}`, // Subject line
				//text: `${this.messaggio}`, // plain text body
				html: `${this.messaggio}`, // html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);

					this.setError(error);

					reject(error);
				} else {
					console.log('Message sent: %s', info.messageId);
					resolve();
				}
			});
		});
	}
}

module.exports = Email;
