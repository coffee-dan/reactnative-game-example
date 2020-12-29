import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/bodyText';
import TitleText from '../components/titleText';

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
			<BodyText>Number of rounds: {roundsNumber}</BodyText>
			<BodyText>Number was: {userNumber}</BodyText>
			<Button title="NEW GAME" onPress={onRestart} />
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
});

export default GameOverScreen;
