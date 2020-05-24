const dotenv = require('dotenv');

dotenv.config({ path: './../config/config.env' });

class Messaggio {
	constructor(nome, cognome, email, tel, messaggio) {
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		tel == undefined
			? (this.tel = "l'utente non ha fornito questo dato")
			: (this.tel = tel);

		this.messaggio = messaggio;

		this.testo = `

				<div>
					
					<table style="font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;">
						<tr>
							<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #81e6d9;color: white;">Nome</th>
							<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #81e6d9;color: white;">Cognome</th>
							<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #81e6d9;color: white;">Email</th>
							<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #81e6d9;color: white;">Telefono</th>
						</tr>

						<tr>
							<td style="border: 1px solid #ddd;padding: 8px;">${this.nome}</td>
							<td style="border: 1px solid #ddd;padding: 8px;">${this.cognome}</td>
							<td style="border: 1px solid #ddd;padding: 8px;">${this.email} </td>
							<td style="border: 1px solid #ddd;padding: 8px;">${this.tel}</td>
						</tr>
					</table>

					<br /><br />
					<table style="font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;">
						<tr >
							<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #81e6d9;color: white;">Messaggio</th>
						</tr>

						<tr>
							<td style="border: 1px solid #ddd;padding: 8px;">${this.messaggio}</td>
						</tr>
					</table>

					<br /> <br />

					<a style="background-color: #81e6d9;color: white;padding: 14px 25px;text-align: center;text-decoration: none;display: inline-block;" href="mailto:${this.email}">rispondi a ${this.nome} ${this.cognome}</a>
				</div>	
			
		`;
	}
}

module.exports = Messaggio;
