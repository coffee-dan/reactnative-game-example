import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import BodyText from '../components/bodyText';
import TitleText from '../components/titleText';

// GAME OVER COMPONENT
function GameOverScreen({ roundsNumber, userNumber, onRestart }) {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over</TitleText>
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
});

export default GameOverScreen;
