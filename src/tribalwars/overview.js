import config from './config';
import util from 'lib/util';

class Overview {
	static urlPath = `${config.basePath}?screen=overview_villages`;

	getVillageList() {
		return new Promise((resolve) => {
			this._getOverviewHtml().then((response) => {
				const matches = response.match(/<a href=".*;screen=overview">[\s\S]*?<\/a>/gi),
					villages = [];

				for (let match of matches) {
					const html = util.createContainer(match),
						village = {};

					village.id = match.match(/village=([0-9]+)/)[1];
					village.name = html.querySelector('.quickedit-label').innerText.trim();

					villages.push(village);
				}

				window.localStorage.setItem('twtVillages', JSON.stringify(villages));

				resolve(villages);
			});
		});
	}

	_getOverviewHtml() {
		return new Promise((resolve) => {
			fetch(Overview.urlPath, {
				credentials: 'include'
			})
				.then(response => response.text())
				.then(response => resolve(response));
		});
	}
}

export default new Overview();
