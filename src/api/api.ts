import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://aapsuj.accevate.co/flutter-api/',
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

api.interceptors.request.use(
	config => {
		console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	},
	error => {
		console.error('API Request Error:', error);
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	response => {
		console.log(`API Response: ${response.status} ${response.config.url}`);
		return response;
	},
	error => {
		if (error.response) {
			console.error('API Error Response:', {
				status: error.response.status,
				data: error.response.data,
				url: error.config.url,
			});
		} else if (error.request) {
			console.error('API No Response:', error.request);
		} else {
			console.error('API Setup Error:', error.message);
		}
		return Promise.reject(error);
	},
);
