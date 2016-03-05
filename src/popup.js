import State from './lib/state';
import Message from './chrome/message';
import view from './popup.jade';

class Popup extends State {
	static defaultState = {
		worlds: {}
	};

	constructor() {
		super();

		const message = new Message('getVillages');

		message.responseCallback = (response) => {
			this.setState({
				worlds: Object.assign(this.state.worlds, response)
			});
		};

		message.send();

		this.containerRender = document.body.querySelector('[data-hook=render]');

		this.render();
	}

	onStateChange() {
		this.render();
	}

	render() {
		this.containerRender.innerHTML = view({
			worlds: this.state.worlds
		});

		this.afterRender();
	}

	afterRender() {
		this.containerRender.querySelector('#test').addEventListener('click', (e) => {
			console.log(e.target);
			this.fetchVillages();
		}, false);
	}

	fetchVillages() {
	}
}

new Popup();
