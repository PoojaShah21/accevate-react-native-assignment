import React from 'react';
import { useDashboard } from './dashboard.hook';
import { CustomButton } from '../../components';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const Dashboard = () => {
	const { bgColor, dashboardData, error, handleLogout, loadDashboard, refreshing, loading } = useDashboard();

	React.useEffect(() => {
		loadDashboard();
	}, []);



	if (loading) {
		return (
			<View style={[styles.loadingContainer, { backgroundColor: bgColor }]}>
				<ActivityIndicator size="large" color="#007AFF" />
				<Text style={styles.loadingText}>Loading dashboard...</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: bgColor }]}
			contentContainerStyle={styles.scrollContent}
		>
			<View style={styles.header}>
				<Text style={styles.title}>Dashboard</Text>
				<CustomButton
					title="Logout"
					onPress={handleLogout}
					variant="danger"
					size="small"
					style={styles.logoutButton}
				/>
			</View>

			{error ? (
				<View style={styles.errorCard}>
					<Text style={styles.errorTitle}>Error Loading Dashboard</Text>
					<Text style={styles.errorText}>{error}</Text>
					<CustomButton
						title="Retry"
						onPress={() => loadDashboard()}
						variant="primary"
						size="medium"
						style={styles.retryButton}
					/>
				</View>
			) : (
				<>
					<View style={styles.card}>
						<Text style={styles.welcomeText}>Welcome to Dashboard!</Text>
						<View style={styles.colorDisplay}>
							<Text style={styles.colorLabel}>Current Color:</Text>
							<View style={[styles.colorBox, { backgroundColor: bgColor }]} />
							<Text style={styles.colorValue}>{bgColor}</Text>
						</View>

						{dashboardData && dashboardData.message && (
							<Text style={styles.messageText}>{dashboardData.message}</Text>
						)}
					</View>

					<CustomButton
						title={refreshing ? 'Refreshing...' : 'Refresh Dashboard'}
						onPress={() => loadDashboard(true)}
						loading={refreshing}
						disabled={refreshing}
						variant="primary"
						size="large"
						style={styles.refreshButton}
					/>
				</>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: '#666',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingTop: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	logoutButton: {
		minWidth: 80,
	},
	errorCard: {
		backgroundColor: 'rgba(255, 59, 48, 0.1)',
		padding: 20,
		borderRadius: 12,
		margin: 20,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#FF3B30',
	},
	errorTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FF3B30',
		marginBottom: 8,
	},
	errorText: {
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
		marginBottom: 16,
	},
	retryButton: {
		minWidth: 100,
	},
	card: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		padding: 24,
		borderRadius: 12,
		margin: 20,
		marginTop: 20,
		alignItems: 'center',
	},
	welcomeText: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#333',
		textAlign: 'center',
	},
	colorDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		flexWrap: 'wrap',
	},
	colorLabel: {
		fontSize: 16,
		color: '#666',
		marginRight: 12,
	},
	colorBox: {
		width: 40,
		height: 40,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: '#ddd',
	},
	colorValue: {
		fontSize: 16,
		fontWeight: '500',
		color: '#333',
		backgroundColor: '#f0f0f0',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 6,
	},
	messageText: {
		fontSize: 14,
		color: '#888',
		textAlign: 'center',
		marginTop: 10,
		fontStyle: 'italic',
	},
	refreshButton: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

export default Dashboard
