import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Cards';
import defaultStyles from '../constants/defaultStyles';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randonNumber = Math.floor(Math.random() * (max - min)) + min;
  console.log('min ', min);
  console.log('max ', max);
  console.log('exclude ', exclude);
  console.log('randonNumber ', randonNumber);
  if (randonNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else{
    return randonNumber; 
  }
}


const GameScreen = props => {

  const {
    userChoice,
    onGameOver
  } = props;

  const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // executes after every render when these dependencies change [currentGuess, userChoice, onGameOver]
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver])

  const {
    screen,
    buttonContainer
  } = styles;

  const nextGuessHandler = direction => {

    if (direction === 'lower' && currentGuess < userChoice ||
      direction === 'higher' && currentGuess > userChoice
    ) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{
        text: 'Sorry', style: 'cancel'
      }]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(rounds + 1);
  }

  return (
    <View style={screen}>
      <Text style={defaultStyles.titleText}>Opponent's guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={buttonContainer}>
        <Button title='Lower' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title='Higher' onPress={nextGuessHandler.bind(this, 'higher')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%'
  }
});

export default GameScreen;