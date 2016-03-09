import config from './config';
import util from 'lib/util';

class Market {
	static modes = {
		DEFAULT: 'other_offer',
		PREMIUM: 'exchange'
	};

	static resourceTypes = {
		WOOD: 'wood',
		STONE: 'stone',
		IRON: 'iron'
	};

	constructor(villageId, mode = Market.modes.DEFAULT) {
		this.id = villageId;
		this.url = `${config.basePath}?village=${villageId}&screen=market&mode=${mode}`;
	}

	getData() {
		return new Promise((resolve) => {
			this._getHtml().then((response) => {
				//Find correct table by assuming it's always directly after the filter
				const rows = util.createContainer(response)
					.querySelectorAll('#offer_filter + .vis tr'),
					parsedRows = [];

				for (let row of rows) {
					let cells = row.querySelectorAll('td'),
						player;

					// Only process rows that has offers made by a player
					if (cells[2] && (player = cells[2].querySelector(':scope > a'))) {
						parsedRows.push({
							receive: this._parseResource(cells[0]),
							offer: this._parseResource(cells[1]),
							player: parseInt(player.href.match(/id=([0-9]+)/)[1]),
							duration: util.clockStringToSeconds(cells[3].innerText),
							ratio: parseFloat(cells[4].innerText, 10),
							amount: parseInt(cells[5].innerText)
						});
					}
				}

				resolve(parsedRows);
			});
		});
	}

	_getHtml() {
		return new Promise((resolve) => {
			fetch(this.url, {
				credentials: 'include'
			})
				.then(response => response.text())
				.then(response => resolve(response));
		});
	}

	_parseResource(resource) {
		const resourceTypes = Object.keys(Market.resourceTypes)
				.map(resourceType => Market.resourceTypes[resourceType]),
			iconClassList = resource.querySelector(
				resourceTypes.map(resourceType => '.' + resourceType).join(', ')
			).classList;

		let type,
			i = 0;

		// Find which of the resource types the icon has as className
		while (i < resourceTypes.length && !iconClassList.contains((type = resourceTypes[i++]))) {
		}

		return {
			type: type,
			value: parseInt(resource.innerText.replace('.', ''), 10)
		};
	}
}

export default Market;
