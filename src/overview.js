class Overview {
	static urlPath = '/game.php?screen=overview_villages';

	_getOverviewHtml(handleResponse) {
		fetch(Overview.urlPath, {
			credentials: 'include'
		})
			.then(response => response.text())
			.then(handleResponse);
	}

	getVillageList() {
		return new Promise((resolve) => {
			const villages = window.localStorage.getItem('twtVillages');

			if (villages === null) {
				console.log('Villages from ajax');
				this._getOverviewHtml((response) => {
					const matches = response.match(/<a href=".*;screen=overview">[\s\S]*?<\/a>/gi),
						villages = [];

					for (let match of matches) {
						const element = document.createElement('div'),
							village = {};

						element.innerHTML = match;

						village.id = match.match(/village=([0-9]+)/)[1];
						village.name = element.querySelector('.quickedit-label').innerText.trim();

						villages.push(village);
					}

					window.localStorage.setItem('twtVillages', JSON.stringify(villages));

					resolve(villages);
				});
			} else {
				console.log('Villages from localstorage');
				resolve(JSON.parse(villages));
			}
		});
	}
}

export default new Overview();
