import chrome from 'chrome';
import Message from './chrome/message';

const ports = [];

const state = {
	worlds: {}
};

function init() {
	chrome.runtime.onConnect.addListener((port) => {
		ports.push(port);

		console.log('Connected ports:', ports.length);

		port.onMessage.addListener((message) => {
			switch (message.type) {
				case 'villages':
					handleVillages(message);

					break;
			}
		});

		port.onDisconnect.addListener((port) => {
			ports.splice(ports.indexOf(port), 1);
		});

		port.postMessage({
			type: 'getVillages'
		});
	});

	Message.addListener((message, messageSender, sendResponse) => {
		switch (message.type) {
			case 'getVillages':
				sendVillages(sendResponse);

				break;
		}
	});
}

function handleVillages(data) {
	const newState = Object.assign({}, state);

	console.log(data);

	Object.assign(newState.worlds, {
		[data.worldId]: {
			villages: data.data
		}
	});

	setState(newState);
}

function sendVillages(callback) {
	callback(state.worlds);
}

function setState(newState) {
	Object.assign(state, newState);

	onStateChange();
}

function onStateChange() {
	console.log('State updated:', state);
}

init();
