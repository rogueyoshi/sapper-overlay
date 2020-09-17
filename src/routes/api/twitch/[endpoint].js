async function channel( { res, twitch, userName } ) {
	const users = userName;
	await twitch.users.usersByName({ users }, (usersByName_err, usersByName_res) => {
		if (usersByName_err) {
				console.warn(usersByName_err);
		} else {
			const channelID = usersByName_res.users[0]._id;
			twitch.channels.channelByID({ channelID }, (channelByID_err, channelByID_res) => {
				if (channelByID_err) {
					console.warn(channelByID_err);
				} else {
					const channelData = channelByID_res;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(channelData));
				}
			});
		}
	});
}

export async function get(req, res, next) {
	const clientId = process.env.TWITCH_APPLICATION_CLIENT_ID;
	const userName = process.env.TWITCH_USER_NAME;

	const twitch = require('twitch-api-v5');
	twitch.clientID = clientId;

	const { endpoint }  = req.params;
	switch (endpoint) {
		case `channel`: await channel( { res, twitch, userName } ); break;
	}
}
