import React from 'react';
import { View, StyleSheet } from 'react-native';

import TitleText from './titleText';
import COLORS from '../constants/colors';

// HEADER COMPONENT
function Header({ title }) {
	return (
		<View style={styles.header}>
			<TitleText style={styles.headerTitle}>{title}</TitleText>
		</View>
	);
}

// HEADER STYLE SHEET
const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'open-sans-bold',
	},
});

export default Header;
