import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Cards';
import defaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';
import {
  Ionicons
} from '@expo/vector-icons';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randonNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randonNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randonNumber;
  }
}

const renderListItem = (guess, index) => (<View style={styles.listItem} key={guess + index}>
  <Text style={defaultStyles.bodyText}>#{index}</Text>
  <Text style={defaultStyles.bodyText}>{guess}</Text>
</View>)


const GameScreen = props => {

  const {
    userChoice,
    onGameOver
  } = props;

  const initialGuess = generateRandomNumber(1, 100, userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // executes after every render when these dependencies change [currentGuess, userChoice, onGameOver]
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver])

  const {
    screen,
    buttonContainer,
    button,
    listView,
    list
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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(rounds + 1);
    setPastGuesses(currentPassGuesses => [nextNumber, ...currentPassGuesses]);
  }

  return (
    <View style={screen}>
      <Text style={defaultStyles.titleText}>Phone's guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={25} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name='md-add' size={25} color='white' />
        </MainButton>
      </Card>
      <View style={listView}>
        <ScrollView contentContainerStyle={list}>
          {
            pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))
          }
        </ScrollView>
      </View>

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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: '90%'
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  listView: {
    flex: 1,
    width: '80%'
  },
  listItem: {
    // flex:1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
});

export default GameScreen;