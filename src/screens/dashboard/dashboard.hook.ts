import React from "react";
import { Alert } from "react-native";
import { Storage } from "../../storage/storage";
import { dashboardApi } from "../../api/auth-api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/root-navigator";

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const useDashboard = () => {
	const navigation = useNavigation<DashboardNavigationProp>();
	const [bgColor, setBgColor] = React.useState('#ffffff');
	const [loading, setLoading] = React.useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const [dashboardData, setDashboardData] = React.useState<any>(null);
	const [error, setError] = React.useState('');

	const loadDashboard = async (isRefresh = false) => {
		if (isRefresh) {
			setRefreshing(true);
		} else {
			setLoading(true);
		}

		setError('');

		try {
			const token = await Storage.getToken();
			if (!token) {
				navigation.replace('Login');
				return;
			}

			const res = await dashboardApi(token);
			setBgColor(res.data.dashboard.color.dynamic_color ?? '#ffffff');
			setDashboardData(res.data);
		} catch (error: any) {
			console.error('Dashboard error:', error);
			const errorMsg =
				error.response?.data?.message ||
				error.message ||
				'Failed to load dashboard data';
			setError(errorMsg);

			if (error.response?.status === 401) {
				Alert.alert('Session Expired', 'Please login again');
				await Storage.clear();
				navigation.replace('Login');
			}
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};
	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Logout',
				onPress: async () => {
					await Storage.clear();
					navigation.replace('Login');
				},
			},
		]);
	};
	return {
		handleLogout,
		loadDashboard,
		bgColor,
		refreshing,
		dashboardData,
		error,
		loading
	};
}

export { useDashboard }