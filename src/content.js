import overview from './tribalwars/overview';
import Village from './tribalwars/village';
import chrome from 'chrome';

let backgroundPort,
	worldId;

if (window.location.pathname === '/game.php') {
	worldId = window.location.host.match(/^([a-z]+[0-9]+)\./)[1];

	console.log('Logged in');

	backgroundPort = chrome.runtime.connect();

	backgroundPort.onMessage.addListener(function (message) {
		switch (message.type) {
			case 'getVillages':
				buildVillageData().then(sendVillageData);

				break;
		}
	});
} else {
	console.log('Not logged in');
}

function buildVillageData() {
	return new Promise((resolve) => {
		const villageList = window.localStorage.getItem('twtVillages');

		if (villageList === null) {
			overview.getVillageList().then((villages) => {
				function tryToResolve(villagesData) {
					if (villagesData.length === villages.length) {
						window.localStorage.setItem('twtVillages', JSON.stringify(villagesData));
						console.log('Saved to localstorage:', villagesData);
						resolve(villagesData);
					}
				}

				const villagesData = [];

				for (let villageData of villages) {
					const village = new Village(villageData.id);

					village.getBuildings().then((buildings) => {
						villageData.buildings = buildings;

						villagesData.push(villageData);

						tryToResolve(villagesData);
					});
				}
			});
		} else {
			console.log('Fetched from localstorage:', JSON.parse(villageList));
			resolve(JSON.parse(villageList));
		}
	});
}

function sendVillageData(data) {
	backgroundPort.postMessage({
		type: 'villages',
		worldId,
		data
	});
}
