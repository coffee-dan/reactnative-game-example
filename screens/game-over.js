import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/bodyText';
import TitleText from '../components/titleText';
import MainButton from '../components/MainButton';
import COLORS from '../constants/colors';

// GAME OVER COMPONENT
function GameOverScreen({ roundsNumber, userNumber, onRestart }) {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over</TitleText>
			<View style={styles.imageContainer}>
				{/* bringing in images provides information about image size that
				can be used for styling */}
				<Image
					// all images have build in fade-in animation that can be modified with
					// fadeDuration=''
					// web images don't come with image size information so that must be added manually
					// source={{uri: 'http://wccftech.com/amd-zen-summit-ridge-launch-q4-2016/'}}
					source={require('../assets/success.png')}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
			{/* nested text components are useful 
				styling cascades down to nested texts
				text does not use flex, more of inline type thing*/}
			<View style={styles.resultsContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed{' '}
					<Text style={styles.highlight}>{roundsNumber}</Text> rounds
					to guess the number{' '}
					<Text style={styles.highlight}>{userNumber}</Text>
				</BodyText>
			</View>
			<MainButton onPress={onRestart}>NEW GAME</MainButton>
		</View>
	);
}

// GAME OVER STYLESHEET
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	resultsContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
	},
	resultText: {
		textAlign: 'center',
		fontSize: 20,
	},
	highlight: {
		color: COLORS.primary,
		fontFamily: 'open-sans-bold',
	},
});

export default GameOverScreen;
