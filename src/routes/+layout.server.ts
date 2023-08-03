import { SAFE_EMAIL } from '$env/static/private';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (!session) return { message: 'Log in' };

	if (session && session?.user?.email === SAFE_EMAIL) {
		return { session };
	}

	return { message: 'You are not allowed to access this site.' };
};
