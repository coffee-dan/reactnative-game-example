import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// utilizing icons built by Ionic team provided by Expo
// always consider UI libraries such as https://github.com/GeekyAnts/NativeBase
// can improve development process when a fully custom UI design is not needed

import Card from '../components/card';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/bodyText';
import TitleText from '../components/titleText';
import MainButton from '../components/MainButton';

// creating function outside of component as it does not use any data
// from the component
const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min) + min);

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

// LIST ITEM SUB COMPONENT
const renderListItem = (value, numOfRound) => (
	<View key={value} style={styles.listItem}>
		<BodyText>Round#{numOfRound}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
);

// GAME SCREEN COMPONENT
function GameScreen({ userChoice, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	// it's safe to use a variable in the creation of these states
	// as React knows not to reinitialize these once they already exist
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);

	// handled seperately from component so they survive re-renders
	// also unlike state will not force a re-render to happen
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	// useEffect by default necessarily runs AFTER every render
	// this is modified by providing a dependency list
	useEffect(() => {
		if (currentGuess === userChoice) {
			// game over
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		// early exit if the player was lying
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert('!', 'little birdie told me you lied', [
				{ text: 'Sorry!', style: 'cancel' },
			]);
			return;
		}

		// update upper and lower bounds according
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			// +1 to exclude the lowerbound from possible guesses
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);

		setCurrentGuess(nextNumber);
		// using currentGuess here would not work as state changes are done in
		// batches after each render
		setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton
					onPress={() => {
						nextGuessHandler('lower');
					}}
				>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton
					onPress={() => {
						nextGuessHandler('greater');
					}}
				>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
				{/* could use FlatList like this with some changes to styling
					and data flow but this is not necessary for this use case
					as the list will on average not be very large */}
				{/* <FlatList
					contentContainerStyle={styles.list}
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/> */}
			</View>
		</View>
	);
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
		width: 400,
		maxWidth: '80%',
	},
	listContainer: {
		// this is required to get Android to function with ScrollView nested
		// in View
		flex: 1,
		width: '80%',
	},
	list: {
		// this is used instead of flex: 1 where it will take up as much space
		// given without messing up the behavior of scrolling
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '60%',
	},
});

export default GameScreen;
