const form = document.getElementById('email-form');
const formBtn = document.getElementById('email-btn');

let btnText = formBtn.textContent;
const loading = document.createElement('i');
loading.classList.add('fa');
loading.classList.add('fa-sync');
loading.classList.add('fa-spin');
loading.classList.add('fa-xl');
// modals
modalSuccess = document.getElementById('modal-success');
modalFailed = document.getElementById('modal-failed');

//buttons per chiudere i modals
msBtn = document.getElementById('ms-btn');
mfBtn = document.getElementById('mf-btn');

msBtn.addEventListener('click', () => {
	closeModal(modalSuccess);
});
mfBtn.addEventListener('click', () => {
	closeModal(modalFailed);
});

form.addEventListener('submit', sendEmail);

function sendEmail(e) {
	console.log('submit');
	formBtn.innerHTML = '';
	formBtn.appendChild(loading);
	formBtn.disabled = true;
	//formBtn.appendChild(loading);
	const nome = document.getElementById('nome').value;
	const cognome = document.getElementById('cognome').value;
	const email = document.getElementById('email').value;
	const tel = document.getElementById('tel').value;
	const messaggio = document.getElementById('messaggio').value;

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
						formBtn.removeChild(loading);
						formBtn.innerHTML = btnText;

						if (data.success || data.status == 200) {
							showModal(modalSuccess);
						} else {
							showModal(modalFailed);
							formBtn.disabled = false;
						}
					})
					.catch((error) => {
						showModal(modalFailed);
						formBtn.removeChild(loading);
						formBtn.innerHTML = btnText;
						formBtn.disabled = false;
						console.error('Error:', error);
					});

				//fetch
			});
	});

	e.preventDefault();
}

function showModal(modal) {
	//console.log('click');
	document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
	modal.classList.remove('hidden');
	//modal.firstElementChild.classList.add('opacity-1');
}

function closeModal(modal) {
	console.log('click');

	modal.classList.add('hidden');
	document
		.getElementsByTagName('body')[0]
		.classList.remove('overflow-hidden');

	//modal.firstElementChild.classList.add('opacity-1');
}

function onSubmit(token) {
	document.getElementById('email-form').submit();
}
