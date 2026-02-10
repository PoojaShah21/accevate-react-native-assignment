import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	loading?: boolean;
	disabled?: boolean;
	variant?: 'primary' | 'secondary' | 'danger' | 'success';
	size?: 'small' | 'medium' | 'large';
	style?: ViewStyle;
	textStyle?: TextStyle;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	loading = false,
	disabled = false,
	variant = 'primary',
	size = 'medium',
	style,
	textStyle,
	leftIcon,
	rightIcon,
}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case 'secondary':
				return { backgroundColor: '#8E8E93', textColor: '#fff' };
			case 'danger':
				return { backgroundColor: '#FF3B30', textColor: '#fff' };
			case 'success':
				return { backgroundColor: '#34C759', textColor: '#fff' };
			default:
				return { backgroundColor: '#007AFF', textColor: '#fff' };
		}
	};

	const getSizeStyles = () => {
		switch (size) {
			case 'small':
				return { height: 40, paddingHorizontal: 16, fontSize: 14 };
			case 'large':
				return { height: 56, paddingHorizontal: 24, fontSize: 18 };
			default:
				return { height: 52, paddingHorizontal: 20, fontSize: 16 };
		}
	};

	const variantStyles = getVariantStyles();
	const sizeStyles = getSizeStyles();

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor: variantStyles.backgroundColor,
					height: sizeStyles.height,
					paddingHorizontal: sizeStyles.paddingHorizontal,
					opacity: disabled || loading ? 0.6 : 1,
				},
				style,
			]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.7}
		>
			{loading ? (
				<ActivityIndicator color={variantStyles.textColor} />
			) : (
				<>
					{leftIcon && <>{leftIcon}</>}
					<Text
						style={[
							styles.buttonText,
							{
								color: variantStyles.textColor,
								fontSize: sizeStyles.fontSize,
								marginLeft: leftIcon ? 8 : 0,
								marginRight: rightIcon ? 8 : 0,
							},
							textStyle,
						]}
					>
						{title}
					</Text>
					{rightIcon && <>{rightIcon}</>}
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	buttonText: {
		fontWeight: '600',
		textAlign: 'center',
	},
});

export default CustomButton;
