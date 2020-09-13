export async function get(req, res, next) {
	const {LASTFM_APPLICATION_API_KEY, LASTFM_USER_NAME} = process.env;

	const LastFm = require("lastfm-node-client");
	const lastFm = new LastFm(LASTFM_APPLICATION_API_KEY);
	const user = LASTFM_USER_NAME;

	lastFm.userGetRecentTracks({
		user: user
	},
	(err, data) => {
		if (err) {
			console.warn(err);
			next();
		} else {
			let song;
			const track = data.recenttracks.track[0];
			const attr = track["@attr"];

			//const nowplaying = attr && attr.nowplaying;
			const nowplaying = true;
			if (nowplaying) {
				const artist = track.artist["#text"];
				const name = track.name;
				song = `${artist} - ${name}`;
			}
			else {
				song = "";
			}

			res.setHeader('Content-Type', 'text/plain; charset=utf-8');
			res.end(song);
		}
	});
}
