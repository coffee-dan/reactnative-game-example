import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/header';
import StartGameScreen from './screens/start-game';
import GameScreen from './screens/game';
import GameOverScreen from './screens/game-over';

// if it is needed later try to install expo-font
// expo install expo-font // or // npm install --save expo-font

// loadAsync returns a Promise which must be resolved before rendering anything
// that depends on these assets
const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

// APP COMPONENT
function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	const configureNewGameHandler = () => {
		// for restarting
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = selectedNumber => {
		setUserNumber(selectedNumber);
	};

	const gameOverHandler = numOfRounds => {
		setGuessRounds(numOfRounds);
	};

	// default screen
	let content = <StartGameScreen onStartGame={startGameHandler} />;

	// identify game state and display correct screen
	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={configureNewGameHandler}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</View>
	);
}

// APP STYLE SHEET
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default App;
