import chrome from 'chrome';

class Popup {
	static defaultState = {
		villages: []
	};

	construcor() {
		chrome.runtime.onMessage.addListener(function (request) {
			switch (request.type) {
				case 'villages':
					break;
			}
		});
	}

	render() {
	}
}

new Popup();
