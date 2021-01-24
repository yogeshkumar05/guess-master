import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
// import StartGame from './screens/select/StartGameScreen';
// import GameScreen from './screens/guessGameScreen';
// import GameOverScreen from './screens/GameOverScreen';
import Navigator from './navigation/Navigator';

export default function App() {
  const { screen } = styles;
  // const [userNumber, setUserNumber] = useState();
  // const [guessRounds, setGuessRounds] = useState(0);

  // const newGameHandler = _ => {
  //   setGuessRounds(0);
  //   setUserNumber(null);
  // }

  // const startGameHandler = selectedNumber => {
  //   setUserNumber(selectedNumber);
  //   setGuessRounds(0);
  // }

  // const gameOverHandler = rounds => {
  //   setGuessRounds(rounds);
  // }

  // let content = <StartGame onStartGame={startGameHandler} />;
  // if (userNumber && guessRounds <= 0) {
  //   content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  // } else if (guessRounds > 0) {
  //   content = <GameOverScreen guessRounds={guessRounds} userNumber={userNumber} onRestart={newGameHandler} />
  // }

  return (
    <View style={screen}>
      <StatusBar hidden={true} />
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
