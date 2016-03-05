import chrome from 'chrome';

class Message {
	constructor(type, message) {
		this.type = type;
		this.message = message;
	}

	noop() {
	}

	send() {
		const data = {
			type: this.type,
			message: this.message
		};

		chrome.runtime.sendMessage(
			this.extensionId || null,
			data,
			this.options,
			this.responseCallback || this.noop
		);
	}
}

export default Message;
