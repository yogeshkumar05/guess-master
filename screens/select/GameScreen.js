import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  Button
} from 'react-native';
import NumberContainer from '../../components/NumberContainer';
import Card from '../../components/Cards';
import defaultStyles from '../../constants/defaultStyles';
import MainButton from '../../components/MainButton';
import {
  Ionicons
} from '@expo/vector-icons';
import {
  generateRandomNumber
} from '../../utils/helpers';
import Colors from '../../constants/colors';
const {
  secondaryColor,
  primaryColor
} = Colors

// const generateRandomNumber = (min, max, exclude) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   const randonNumber = Math.floor(Math.random() * (max - min)) + min;
//   if (randonNumber === exclude) {
//     return generateRandomNumber(min, max, exclude);
//   } else {
//     return randonNumber;
//   }
// }

const renderListItem = (guess, index) => (<View style={styles.listItem} key={guess + index}>
  <Text style={defaultStyles.bodyText}>#{index}</Text>
  <Text style={defaultStyles.bodyText}>{guess}</Text>
</View>)


const GameScreen = props => {

  const {
    userChoice,
    onGameOver,
    onRestart
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
    list,
    quitStyle,
    quitText
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

  const restartGame = () => {
    console.log('restartGame');
    props.navigation.navigate('Select')
  }

  const quitHandler = () => {
    Alert.alert(
      'Restart game',
      'Are you sure you want to restart the game',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => onRestart()
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={screen}>
      <View style={quitStyle}>
        <Ionicons onPress={quitHandler} name="arrow-back-circle" size={24} color={primaryColor} />
      </View>
      <Text style={{color: secondaryColor, marginBottom: 5}}>You selected: {userChoice}</Text>


      <Text style={{fontSize: 22,
    fontWeight: 'bold', color: primaryColor}}>App guessed</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Text style={{color: secondaryColor, marginTop: 10}}>Hint:</Text>
      <Card style={buttonContainer}>
        <View style={{display: 'flex',alignItems: 'center'}}>
          <MainButton style={{ backgroundColor: secondaryColor }} onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={25} color='white' />
          </MainButton>
          <Text style={{fontWeight: 'bold', marginTop: 3}}>Lower</Text>
        </View>
        <View style={{display: 'flex',alignItems: 'center'}}>
          <MainButton style={{ backgroundColor: secondaryColor }} onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name='md-add' size={25} color='white' />
          </MainButton>
          <Text style={{fontWeight: 'bold', marginTop: 3}}>Greater</Text>
        </View>

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
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
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
  },
  quitStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 25
  }
});

export default GameScreen;