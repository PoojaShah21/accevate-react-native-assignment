import React from 'react';
import { Dashboard, Login, Otp } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
	Login: undefined;
	Otp: { userId: string };
	Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Otp" component={Otp} />
				<Stack.Screen name="Dashboard" component={Dashboard} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
