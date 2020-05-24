class Esito {
	constructor(success, msg, errors, status) {
		this.success = success;
		this.msg = msg;
		this.errors = errors;
		this.status = status;
	}
}

module.exports = Esito;
