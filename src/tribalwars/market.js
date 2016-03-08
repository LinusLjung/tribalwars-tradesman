import config from './config';
import util from 'lib/util';

class Market {
	static modes = {
		DEFAULT: 'other_offer',
		PREMIUM: 'exchange'
	};

	constructor(villageId, mode = Market.modes.PREMIUM) {
		this.id = villageId;
		this.url = `${config.basePath}?village=${villageId}&screen=market&mode=${mode}`;
	}

	getData() {
		this._getHtml().then((response) => {
			console.log(util.createContainer(response));
		});
	}

	_getHtml() {
		return new Promise((resolve) => {
			fetch(this.url)
				.then(response => response.text())
				.then(response => resolve(response));
		});
	}
}

export default Market;
