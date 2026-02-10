import React from 'react';
import { useOtp } from './otp.hook';
import { CustomButton, InputField } from '../../components';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';

const Otp = () => {

	const { error, handleOtpChange, loading, otp, verifyOtp } = useOtp();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.content}>
					<Text style={styles.title}>OTP Verification</Text>
					<Text style={styles.subtitle}>
						Enter the 6-digit OTP sent to your account
					</Text>

					<InputField
						label="Enter OTP"
						placeholder="000000"
						value={otp}
						onChangeText={handleOtpChange}
						error={error}
						keyboardType="number-pad"
						maxLength={6}
						editable={!loading}
						autoFocus
						style={{ textAlign: 'center', fontSize: 24, letterSpacing: 12 }}
						containerStyle={{ marginBottom: 24 }}
					/>

					<CustomButton
						title="Verify OTP"
						onPress={verifyOtp}
						loading={loading}
						disabled={loading || otp.length !== 6}
						variant="success"
						size="large"
						style={styles.verifyButton}
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
	content: {
		backgroundColor: '#fff',
		padding: 24,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
		color: '#333',
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 30,
		color: '#666',
	},
	infoBox: {
		backgroundColor: '#F8F9FA',
		padding: 16,
		borderRadius: 8,
		marginBottom: 24,
		borderLeftWidth: 4,
		borderLeftColor: '#34C759',
	},
	infoTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
	},
	infoText: {
		fontSize: 13,
		color: '#555',
		marginBottom: 4,
	},
	noteText: {
		fontSize: 12,
		color: '#888',
		fontStyle: 'italic',
		marginTop: 8,
	},
	verifyButton: {
		marginBottom: 12,
	},
	resendButton: {
		marginTop: 8,
	},
});

export default Otp
