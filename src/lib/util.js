export default {
	createContainer(html) {
		const element = document.createElement('div');

		element.innerHTML = html;

		return element;
	},

	clockStringToSeconds(clockString) {
		let clockArr = clockString.split(':'),
			sum = 0;

		sum += parseInt(clockArr[0], 10) * 60 * 60;
		sum += parseInt(clockArr[1], 10) * 60;
		sum += parseInt(clockArr[2], 10);

		return sum;
	}
};
