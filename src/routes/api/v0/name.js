
export async function get(req, res, next) {
	const {TWITCH_USER_NAME} = process.env;
	res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	res.end(TWITCH_USER_NAME);
}
