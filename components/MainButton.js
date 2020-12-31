import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import COLORS from '../constants/colors';

// custom buttons are necessarily a combination of View, Text,
// and a Touchable component with some styling

// MAIN BUTTON COMPONENT - non extensible pill button
function MainButton({ children, onPress }) {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
}

// MAIN BUTTON STYLE SHEET
const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18,
	},
});

export default MainButton;
