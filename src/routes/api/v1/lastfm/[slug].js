const LastFm = require(`lastfm-node-client`);

let lastFm;
let apiKey;
let userName;

async function song(req, res, next) {
	lastFm.userGetRecentTracks({
		user: userName
	},
	(_err, _data) => {
		if (_err) {
			console.warn(_err);
			next();
		} else {
			let song;
			const track = _data.recenttracks.track[0];
			const attr = track[`@attr`];

			//const nowplaying = attr && attr.nowplaying;
			const nowplaying = true;
			if (nowplaying) {
				const artist = track.artist[`#text`];
				const name = track.name;
				
				song = `${artist} - ${name}`;
			}
			else {
				song = ``;
			}

			res.setHeader(`Content-Type`, `text/plain; charset=utf-8`);
			res.end(song);
		}
	});
}

export async function get(req, res, next) {
	apiKey = process.env.LASTFM_APPLICATION_API_KEY;
	userName = process.env.LASTFM_USER_NAME;

	lastFm = lastFm ? lastFm : new LastFm(apiKey);

	const { slug }  = req.params;
	switch (slug) {
		case `song`: await song(req, res, next); break;
	}
}
