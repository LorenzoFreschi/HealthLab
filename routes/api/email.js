const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');
const Messaggio = require('../../models/Messaggio');
const Email = require('../../models/Email');
const Esito = require('../../models/Esito');

dotenv.config({ path: '../../config/config.env' });

router.post('/', (req, res) => {
	esito = new Esito(false, 'errore interno al server', new Array(), 500);

	if (
		req.body.token != undefined &&
		req.body.nome != undefined &&
		req.body.cognome != undefined &&
		req.body.email != undefined &&
		req.body.messaggio != undefined
	) {
		const TOKEN = req.body.token;
		const BIG_G_URL = process.env.BIG_G_URL;
		const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

		//nuovo oggetto Messaggio
		messaggio = new Messaggio(
			req.body.nome,
			req.body.cognome,
			req.body.email,
			req.body.tel,
			req.body.messaggio
		);

		//nuovo oggetto Email
		email = new Email(messaggio.testo);

		//invia request ad api google per conferma reCaptcha se campo success == true e campo score > 0.4 procede

		axios.get(`${BIG_G_URL}?secret=${RECAPTCHA_SECRET}&response=${TOKEN}`)
			.then((response) => {
				console.log('success:' + response.data.success);
				console.log('score:' + response.data.score);

				if (response.data.success && response.data.score > 0.5) {
					email.send()
						.then(() => {
							console.log('andata a buon fine');
							esito.status = 200;
							esito.success = true;
							esito.msg = 'email inviata correttamente';

							res.status(esito.status);
							res.json(esito);
						})
						.catch((err) => {
							console.log('NON andata a buon fine');
							esito.status = 500;
							esito.success = false;
							esito.msg =
								"errore durante l'invio dell'email";
							esito.errors.push(err);

							res.status(esito.status);
							res.json(esito);
						});
				} else {
					console.log('success:' + response.data.success);
					console.log('score:' + response.data.score);

					esito.status = 500;
					esito.success = false;
					esito.msg = 'Errore reCapcha';
					esito.errors.push(
						`verifica reCaptcha non andata a buon fine success:${response.data.success}, score:${response.data.score}`
					);
				}

				//res.status(esito.status);
				//res.json(esito);
			})
			.catch((error) => {
				console.log('success:' + response.data.success);
				console.log('score:' + response.data.score);

				console.log('Errore Axios: ' + error);

				esito.status = 500;
				esito.success = false;
				esito.msg = 'Errore durante chiamata a Google reCaptcha';
				esito.errors.push(error);

				res.status(esito.status);
				res.json(esito);
			});
	} else {
		if (req.body.token == undefined) {
			esito.success = false;
			esito.msg = 'Errore: parametro mancante';
			esito.errors.push('campo token non presente');
			esito.status = 400;
		}
		if (req.body.nome == undefined) {
			esito.success = false;
			esito.msg = 'Errore: parametro mancante';
			esito.errors.push('campo nome non presente');
			esito.status = 400;
		}
		if (req.body.cognome == undefined) {
			esito.success = false;
			esito.msg = 'Errore: parametro mancante';
			esito.errors.push('campo cognome non presente');
			esito.status = 400;
		}
		if (req.body.email == undefined) {
			esito.success = false;
			esito.msg = 'Errore: parametro mancante';
			esito.errors.push('campo email non presente');
			esito.status = 400;
		}
		if (req.body.messaggio == undefined) {
			esito.success = false;
			esito.msg = 'Errore: parametro mancante';
			esito.errors.push('campo messaggio non presente');
			esito.status = 400;
		}

		res.status(esito.status);
		res.json(esito);
	}
});

module.exports = router;
