import React from "react";
import { Alert } from "react-native";
import { loginApi } from "../../api/auth-api";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/root-navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const useLogin = () => {
	const navigation = useNavigation<LoginNavigationProp>();
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [errors, setErrors] = React.useState<{
		username?: string;
		password?: string;
	}>({});

	const validateForm = () => {
		const newErrors: { username?: string; password?: string } = {};

		if (!username.trim()) {
			newErrors.username = 'Username is required';
		}

		if (!password.trim()) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onLogin = async () => {
		if (!validateForm()) {
			return;
		}

		setLoading(true);
		try {
			const res = await loginApi(username, password);
			if (res.data && res.data.status && res.data.userid) {
				navigation.navigate('Otp', { userId: res.data.userid });
			} else {
				Alert.alert('Login Failed', res.data?.message || 'Invalid credentials');
			}
		} catch (error: any) {
			console.error('Login error:', error);
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				'Network error. Please try again.';

			Alert.alert('Login Error', errorMessage);

			if (error.response?.data?.field === 'username') {
				setErrors(prev => ({ ...prev, username: errorMessage }));
			} else if (error.response?.data?.field === 'password') {
				setErrors(prev => ({ ...prev, password: errorMessage }));
			}
		} finally {
			setLoading(false);
		}
	};

	const clearError = (field: 'username' | 'password') => {
		setErrors(prev => ({ ...prev, [field]: undefined }));
	};

	return {
		password,
		setPassword,
		errors,
		clearError,
		onLogin,
		loading,
		username,
		setUsername,
	};
};
export { useLogin }