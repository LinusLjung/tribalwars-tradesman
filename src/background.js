import chrome from 'chrome';
import Message from 'chrome/message';

const ports = {};

const state = {
	worlds: {}
};

function init() {
	chrome.runtime.onConnect.addListener((port) => {
		port.onMessage.addListener((message) => {
			switch (message.type) {
				case 'register':
					handlePortRegister(port, message.data);

					break;
				case 'worldData':
					handleWorldData(port.data.worldId, message);

					break;
			}
		});

		port.onDisconnect.addListener((port) => {
			ports[port.data.worldId].splice(ports[port.data.worldId].indexOf(port), 1);
			console.log('Current ports:', ports);
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

function handlePortRegister(port, data) {
	port.data = data;

	if (!ports[data.worldId]) {
		ports[data.worldId] = [port];
	} else {
		ports[data.worldId].push(port);
	}

	console.log('Current ports:', ports);

	if (!state.worlds[data.worldId]) {
		port.postMessage({
			type: 'getWorldData'
		});
	}
}

function handleWorldData(worldId, data) {
	const newState = Object.assign({}, state);

	Object.assign(newState.worlds, {
		[worldId]: data.data
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
	for (let worldId in ports) {
		ports[worldId].forEach(function (port) {
			port.postMessage({
				type: 'state',
				data: state
			});
		});
	}

	console.log('State updated:', state);
}

init();
