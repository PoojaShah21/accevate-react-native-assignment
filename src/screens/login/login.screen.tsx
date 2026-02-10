import React from 'react';
import { useLogin } from './login.hook';
import { CustomButton, InputField } from '../../components';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';


const Login = () => {
	const { clearError, errors, loading, onLogin, password, setPassword, setUsername, username } = useLogin();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<Image
					 source={require('../../assets/logo.png')}
					style={styles.logo}
				/>

				<Text style={styles.subtitle}>Please login to continue</Text>

				<View style={styles.form}>
					<InputField
						label="Username"
						placeholder="Enter your username"
						value={username}
						onChangeText={text => {
							setUsername(text);
							clearError('username');
						}}
						error={errors.username}
						autoCapitalize="none"
						editable={!loading}
						autoCorrect={false}
					/>

					<InputField
						label="Password"
						placeholder="Enter your password"
						value={password}
						onChangeText={text => {
							setPassword(text);
							clearError('password');
						}}
						error={errors.password}
						secureTextEntry
						editable={!loading}
					/>

					<CustomButton
						title="Login"
						onPress={onLogin}
						loading={loading}
						disabled={loading}
						variant="primary"
						size="large"
						style={styles.loginButton}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: 'center',
		padding: 20,
	},
	logo: {
		height: 80,
		resizeMode: 'contain',
		marginBottom: 10,
		alignSelf: 'center',
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
		color: '#666',
	},
	form: {
		backgroundColor: '#fff',
		padding: 24,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	loginButton: {
		marginTop: 10,
		marginBottom: 20,
	},
});

export default Login;
