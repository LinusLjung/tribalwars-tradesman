export default {
	createContainer(html) {
		const element = document.createElement('div');

		element.innerHTML = html;

		return element;
	}
};
