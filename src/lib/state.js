class State {
	constructor() {
		this.state = this.constructor.defaultState || {};
	}

	setState(state) {
		this.state = Object.assign(this.state, state);

		this.onStateChange();
	}
}

export default State;
