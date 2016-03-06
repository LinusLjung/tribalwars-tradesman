class Village {
	constructor(id) {
		this.url = `/game.php?village=${id}`;
	}

	getBuildings() {
		return new Promise((resolve) => {
			fetch(this.url, {
				credentials: 'include'
			})
				.then(response => response.text())
				.then((response) => {
					const element = document.createElement('div'),
						buildingData = {};

					let buildings,
						visualView;

					element.innerHTML = response;

					try {
						buildings = element.querySelector('#buildings_visual')
							.querySelectorAll('[id^=l_]');

						visualView = true;
					} catch (e) {
						buildings = element.querySelector('#show_summary')
							.querySelectorAll('[id^=l_]');

						visualView = false;
					}

					if (visualView) {
						for (let building of buildings) {
							let key = building.id.match(/l_([a-z]+)/)[1];

							buildingData[key] = {
								title: building.title,
								level: parseInt(building.querySelector('.label').innerText, 10)
							};
						}
					} else {
						for (let building of buildings) {
							let key = building.id.match(/l_([a-z]+)/)[1],
								matches = building
									.querySelector('td')
									.innerText
									.trim()
									.match(/(.*)[\s\r\n]+\(.*\s([0-9]+)\)/);

							buildingData[key] = {
								title: matches[1],
								level: parseInt(matches[2], 10)
							};
						}
					}

					resolve(buildingData);
				});
		});
	}
}

export default Village;
