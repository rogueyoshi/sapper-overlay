export async function get(req, res, next) {
	const {TWITCH_APPLICATION_CLIENT_ID, TWITCH_USER_NAME} = process.env;

	const twitch = require('twitch-api-v5');
	twitch.clientID = TWITCH_APPLICATION_CLIENT_ID;

	twitch.users.usersByName({ users: TWITCH_USER_NAME }, (_err, _res) => {
		if(_err) {
				console.warn(_err);
				next();
		} else {
				const id = _res.users[0]._id;

				twitch.channels.channelByID({ channelID: id }, (_err, _res) => {
			    if(_err) {
			        console.warn(_err);
							next();
			    } else {
							const status = _res.status;
							res.setHeader('Content-Type', 'text/plain; charset=utf-8');
							res.end(status);
			    }
				});
			}
	});
}
