import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export default function NumberContainer({ children }) {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{children}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: COLORS.accent,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	number: {
		color: COLORS.accent,
		fontSize: 22,
	},
})