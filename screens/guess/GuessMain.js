import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from '../../components/Header';
import StartGame from './StartGuessScreen';
import GameScreen from './GuessScreen';
import GameOverScreen from './GuessOverScreen';

export default function App() {
  const {screen} = styles;
  const [selectedNumber, setselectedNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const newGameHandler = _ => {
    setGuessRounds(0);
    setselectedNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setselectedNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = rounds => {
    setGuessRounds(rounds); 
  }

  // gameQuitHandler = () => {
  //   setselectedNumber(null);
  //   setGuessRounds(0)
  // }

  let content = <StartGame onStartGame={startGameHandler}/>;
  if(selectedNumber && guessRounds <= 0) {
    content = <GameScreen
     selectedNumber={selectedNumber} 
     onGameOver={gameOverHandler}
     onRestart={newGameHandler}
    />;  
  } else if(guessRounds > 0) {
    content = <GameOverScreen 
    guessRounds={guessRounds} 
    selectedNumber={selectedNumber} 
    onRestart={newGameHandler}
    />
  }

  return (
    <View style={screen}>
      <Header title='Guess Master' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
