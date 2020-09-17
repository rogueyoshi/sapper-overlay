 async function track({ res, lastFm, userName }) {
	 const user = userName;
	await lastFm.userGetRecentTracks({ user }, (userGetRecentTracks_err, userGetRecentTracks_data) => {
		if (userGetRecentTracks_err) {
			console.warn(userGetRecentTracks_err);
		} else {
			const trackData = userGetRecentTracks_data.recenttracks.track[0];
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(trackData));
		}
	});
}

export async function get(req, res, next) {
	const apiKey = process.env.LASTFM_APPLICATION_API_KEY;
	const userName = process.env.LASTFM_USER_NAME;

	const LastFm = require(`lastfm-node-client`);
	const lastFm = new LastFm(apiKey);

	const { endpoint }  = req.params;
	switch (endpoint) {
		case `track`: await track({ req, res, userName, lastFm }); break;
	}
}
