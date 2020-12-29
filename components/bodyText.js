import React from 'react';
import { Text, StyleSheet } from 'react-native';

// provider of styling for body text elements
function BodyText({ children }) {
	return <Text style={styles.body}>{children}</Text>;
}

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans',
	},
});

export default BodyText;
