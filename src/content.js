import overview from './tribalwars/overview';
import Message from './chrome/message';

if (window.location.pathname === '/game.php') {
	console.log('Logged in');

	overview.getVillageList().then((villages) => {
		new Message('villages', villages).send();
	});
} else {
	console.log('Not logged in');
}
