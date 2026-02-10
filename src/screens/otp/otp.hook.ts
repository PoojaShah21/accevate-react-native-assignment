import React from 'react';
import { Alert } from 'react-native';
import { Storage } from '../../storage/storage';
import { otpVerifyApi } from '../../api/auth-api';
import { RootStackParamList } from '../../navigation/root-navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type OtpRouteProp = RouteProp<RootStackParamList, 'Otp'>;
type OtpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Otp'>;

const useOtp = () => {
	const navigation = useNavigation<OtpNavigationProp>();
	const route = useRoute<OtpRouteProp>();
	const [otp, setOtp] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const { userId } = route.params;

	const validateOtp = () => {
		if (!otp.trim()) {
			setError('OTP is required');
			return false;
		}

		if (otp.length !== 6) {
			setError('OTP must be 6 digits');
			return false;
		}

		if (!/^\d+$/.test(otp)) {
			setError('OTP should contain only numbers');
			return false;
		}

		setError('');
		return true;
	};

	const verifyOtp = async () => {
		if (!validateOtp()) {
			return;
		}

		setLoading(true);
		try {
			const res = await otpVerifyApi(userId, otp);

			if (res.data && res.data.status && res.data.token) {
				await Storage.setToken(res.data.token);
				navigation.replace('Dashboard');
			} else {
				const errorMsg = res.data?.message || 'Invalid OTP';
				setError(errorMsg);
				Alert.alert('Verification Failed', errorMsg);
			}
		} catch (error: any) {
			console.error('OTP verification error:', error);
			const errorMsg =
				error.response?.data?.message ||
				error.message ||
				'Network error. Please try again.';
			setError(errorMsg);
			Alert.alert('Verification Error', errorMsg);
		} finally {
			setLoading(false);
		}
	};

	const handleOtpChange = (text: string) => {
		const numericText = text.replace(/[^0-9]/g, '');
		setOtp(numericText);

		if (error && numericText.length > 0) {
			setError('');
		}
	};
	return {
		handleOtpChange,
		verifyOtp,
		validateOtp,
		otp,
		error,
		loading,
	};
};

export { useOtp };
