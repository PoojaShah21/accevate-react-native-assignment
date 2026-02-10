import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
	setToken: async (token: string) => {
		try {
			await AsyncStorage.setItem('TOKEN', token);
			console.log('Token stored successfully');
		} catch (error) {
			console.error('Error storing token:', error);
		}
	},

	getToken: async () => {
		try {
			const token = await AsyncStorage.getItem('TOKEN');
			return token;
		} catch (error) {
			console.error('Error getting token:', error);
			return null;
		}
	},

	getUserId: async () => {
		try {
			return await AsyncStorage.getItem('USER_ID');
		} catch (error) {
			console.error('Error getting user ID:', error);
			return null;
		}
	},

	setUserId: async (userId: string) => {
		try {
			await AsyncStorage.setItem('USER_ID', userId);
		} catch (error) {
			console.error('Error storing user ID:', error);
		}
	},

	clear: async () => {
		try {
			await AsyncStorage.clear();
			console.log('Storage cleared successfully');
		} catch (error) {
			console.error('Error clearing storage:', error);
		}
	},
};
