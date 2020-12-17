import React from 'react'
import { View, StyleSheet } from 'react-native'

// Purely styling component, more a kin to a CSS class than a standard
// React Component
export default function Card({ children, style }) {
	return <View style={{ ...styles.defaultCard, ...style }}>{children}</View>
}

const styles = StyleSheet.create({
	defaultCard: {
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 6,
		shadowOpacity: 0.26,
		elevation: 5,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
	},
})
