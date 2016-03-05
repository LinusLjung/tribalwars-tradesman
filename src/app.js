import overview from './overview';

if (window.location.pathname === '/game.php') {
	console.log('Logged in');

	overview.getVillageList().then((villages) => {
		console.log(villages);
	});
} else {
	console.log('Not logged in');
}
