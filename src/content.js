import overview from './tribalwars/overview';
import chrome from 'chrome';

let backgroundPort,
	id;

if (window.location.pathname === '/game.php') {
	id = window.location.host.match(/^([a-z]+[0-9]+)\./)[1];

	console.log('Logged in');

	backgroundPort = chrome.runtime.connect();

	backgroundPort.onMessage.addListener(function (message) {
		switch (message.type) {
			case 'getVillages':
				sendVillages();

				break;
		}
	});
} else {
	console.log('Not logged in');
}

function sendVillages() {
	overview.getVillageList().then((villages) => {
		backgroundPort.postMessage({
			type: 'villages',
			id,
			villages
		});
	});
}
