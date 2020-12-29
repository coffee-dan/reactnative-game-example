import React from 'react';
import { Text, StyleSheet } from 'react-native';

// provider of styling for title text elements
function TitleText({ children, style }) {
	return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
});

export default TitleText;
