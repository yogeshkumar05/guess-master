import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from '../../components/Header';
import StartGame from './StartGameScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import COLORS from '../../constants/colors';

export default function App() {
  const { screen } = styles;
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const newGameHandler = _ => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = rounds => {
    setGuessRounds(rounds);
  }

  let content = <StartGame onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler}
      onRestart={newGameHandler}
    />;
  } else if (guessRounds > 0) {
    content = <GameOverScreen
      guessRounds={guessRounds}
      userNumber={userNumber}
      onRestart={newGameHandler}
    />
  }

  return (
    <View style={screen}>
      <Header title='Guess Master' style={{ backgroundColor: COLORS.secondaryColor }} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
