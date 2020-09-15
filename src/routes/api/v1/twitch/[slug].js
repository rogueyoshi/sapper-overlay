const twitch = require('twitch-api-v5');

let clientId;
let userName;

async function name(req, res, next) {
	res.setHeader(`Content-Type`, `text/plain; charset=utf-8`);
	res.end(userName);
}

async function status(req, res, next) {
	twitch.users.usersByName({ users: userName }, (_err, _res) => {
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

export async function get(req, res, next) {
	clientId = process.env.TWITCH_APPLICATION_CLIENT_ID;
	userName = process.env.TWITCH_USER_NAME;

	twitch.clientID = clientId;

	const { slug }  = req.params;
	switch (slug) {
		case `name`: await name(req, res, next); break;
		case `status`: await status(req, res, next); break;
	}
}
