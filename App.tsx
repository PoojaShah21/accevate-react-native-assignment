import React from 'react';
import RootNavigator from './src/navigation/root-navigator';
import { StatusBar } from 'react-native';

export default function App() {
	return (
		<>
			<StatusBar backgroundColor={'#f5f5f5'} barStyle={'dark-content'} />
			<RootNavigator />
		</>
	);
}
