import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

interface InputFieldProps extends TextInputProps {
	label?: string;
	error?: string;
	containerStyle?: ViewStyle;
	showError?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	error,
	containerStyle,
	showError = true,
	...props
}) => {
	const hasError = Boolean(error);

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}

			<TextInput
				style={[
					styles.input,
					hasError && styles.inputError,
					props.editable === false && styles.inputDisabled,
				]}
				placeholderTextColor="#999"
				{...props}
			/>

			{showError && hasError && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 8,
		color: '#333',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 14,
		fontSize: 16,
		backgroundColor: '#fafafa',
		color: '#333',
	},
	inputError: {
		borderColor: '#FF3B30',
		backgroundColor: '#FFF5F5',
	},
	inputDisabled: {
		backgroundColor: '#f0f0f0',
		color: '#999',
	},
	errorText: {
		color: '#FF3B30',
		fontSize: 14,
		marginTop: 4,
		marginLeft: 4,
	},
});

export default InputField;
