import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

// rest props is used here to gather up all props that are not explictly
// grabbed by name such that the component is more flexible
export default function Input({ style, ...restProps }) {
	return <TextInput {...restProps} style={{ ...styles.input, ...style }} />
}

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		marginVertical: 10,
	},
})
