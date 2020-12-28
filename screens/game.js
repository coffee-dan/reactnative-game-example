import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import Card from '../components/card'
import NumberContainer from '../components/numberContainer'

// creating function outside of component as it does not use any data
// from the component
const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	const rndNum = Math.floor(Math.random() * (max - min) + min)

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return rndNum
	}
}

// GAME SCREEN COMPONENT
function GameScreen({ userChoice, onGameOver }) {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	)

	const [rounds, setRounds] = useState(0)

	// handled seperately from component so they survive re-renders
	// also unlike state will not force a re-render to happen
	const currentLow = useRef(1)
	const currentHigh = useRef(100)

	// useEffect by default necessarily runs AFTER every render
	// this is modified by providing a dependency list
	useEffect(() => {
		if (currentGuess === userChoice) {
			// game over
			onGameOver(rounds)
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		// early exit if the player was lying
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert('!', 'little birdie told me you lied', [
				{ text: 'Sorry!', style: 'cancel' },
			])
			return
		}

		// update upper and lower bounds according
		if (direction === 'lower') {
			currentHigh.current = currentGuess
		} else {
			currentLow.current = currentGuess
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		)

		setCurrentGuess(nextNumber)
		setRounds(currRounds => currRounds + 1)
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<Button
					title="LOWER"
					onPress={() => {
						nextGuessHandler('lower')
					}}
				/>
				<Button
					title="GREATER"
					onPress={() => {
						nextGuessHandler('greater')
					}}
				/>
			</Card>
		</View>
	)
}

// GAME SCREEN STYLESHEET
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
})

export default GameScreen
