import { api } from './api';

const loginApi = (userid: string, password: string) => {
	return api.post('/login.php', { userid, password });
};

const otpVerifyApi = (userid: string, otp: string) => {
	return api.post('/verify_otp.php', { userid, otp });
};

const dashboardApi = (token: string) => {
	return api.get('/dashboard.php', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export { loginApi, otpVerifyApi, dashboardApi };
