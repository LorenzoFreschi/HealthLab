const form = document.getElementById('email-form');

form.addEventListener('submit', sendEmail);

function sendEmail(e) {
	const nome = document.getElementById('nome').value;
	const cognome = document.getElementById('cognome').value;
	const email = document.getElementById('email').value;
	const tel = document.getElementById('tel').value;
	const messaggio = document.getElementById('messaggio').value;

	l;

	/* 	console.log(nome);
	console.log(cognome);
	console.log(email);
	console.log(tel);
	console.log(messaggio); */

	grecaptcha.ready(function () {
		grecaptcha
			.execute('6LdJufoUAAAAAAAWTpNWzLeh-HSSIqr6IZgCIhHk', {
				action: 'submit',
			})
			.then(function (token) {
				//console.log(token);

				const data = {
					token: token,
					nome: nome,
					cognome: cognome,
					email: email,
					tel: tel,
					messaggio: messaggio,
				};

				fetch('/api/email', {
					method: 'POST', // or 'PUT'
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log('Success:', data);
					})
					.catch((error) => {
						console.error('Error:', error);
					});

				//fetch
			});
	});

	e.preventDefault();
}

function onSubmit(token) {
	document.getElementById('email-form').submit();
}
