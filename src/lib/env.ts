const MONGODB_URL: string = process?.env.MONGODB_URL || '';
const GOOGLE_MAPS_API_KEY: string = process?.env.GOOGLE_MAPS_API_KEY || '';
const ADMIN_LOGIN: string = process?.env.ADMIN_LOGIN || '';

if (!MONGODB_URL) {
	console.error('env MONGODB_URL is not set');
	process.exit(1);
}
if (!GOOGLE_MAPS_API_KEY) {
	console.error('env GOOGLE_MAPS_API_KEY is not set');
	process.exit(1);
}
if (!ADMIN_LOGIN) {
	console.error('env ADMIN_LOGIN is not set');
	process.exit(1);
}

export { MONGODB_URL, GOOGLE_MAPS_API_KEY, ADMIN_LOGIN };
