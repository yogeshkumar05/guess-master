import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  Button,
  Keyboard
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
import Input from '../../components/Input';
import Colors from '../../constants/colors';


const renderListItem = (guess, index) => (<View style={styles.listItem} key={guess + index}>
  <Text style={defaultStyles.bodyText}>#{index}</Text>
  <Text style={defaultStyles.bodyText}>{guess}</Text>
</View>)

const {
  primaryColor,
  secondaryColor
} = Colors;
const GameScreen = props => {

  const {
    selectedNumber,
    onGameOver,
    onRestart
  } = props;


  const [pastGuesses, setPastGuesses] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
  const [confirmedNumber, setConfirmedNumber] = useState(null);


  const {
    screen,
    buttonContainer,
    hintContainer,
    button,
    listView,
    list,
    inputContainer,
    input,
    buttonView,
    buttonCircle,
    quitStyle
  } = styles;

  const numberInputHandler = (inputText) => {
    // replace any character other than numbers with empty string 
    const validInputText = inputText.replace(/[^0-9]/g, '');
    setEnteredValue(validInputText);
  }

  const resetHandler = _ => {
    setEnteredValue('');
    // setConfirmed(false);
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

  const confirmHandler = _ => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number',
        'Number has to be greater than 0 and less than 100',
        [{ text: 'Ok', style: 'destructive', onPress: resetHandler }]);
      return;
    }

    // setConfirmed(true);
    // setSelectedNumber(chosenNumber);
    pastGuesses.unshift(chosenNumber);
    setConfirmedNumber(chosenNumber);
    setPastGuesses(pastGuesses)
    setEnteredValue('');
    Keyboard.dismiss();
    if (selectedNumber === chosenNumber) {
      onGameOver(pastGuesses.length);
    }
  }


  return (
    <View style={screen}>
      <View style={quitStyle}>
        <Ionicons onPress={quitHandler} name="arrow-back-circle" size={24} color={secondaryColor} />
      </View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>App has already selected a number.</Text>
      <Card style={inputContainer}>
        <Text>Guess the number</Text>
        <Input
          style={input}
          keyboardType='numeric'
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={buttonView}>
          <View style={{ width: buttonWidth }}>
            <Button title='Reset' color={secondaryColor} onPress={resetHandler} />
          </View>
          <View style={{ width: buttonWidth }}>
            <Button title='Confirm' color={primaryColor} onPress={confirmHandler} />
          </View>
        </View>
      </Card>
      <Card style={hintContainer}>
        {/* <MainButton style={buttonCircle}> */}
        <Text>Hint:</Text>
        {
          confirmedNumber ? <View style={{alignItems: 'center', flexDirection: 'row'}}>
            {/* <Ionicons name={confirmedNumber > selectedNumber ? 'md-remove' : 'md-add'} size={35} color={primaryColor} /> */}
            <Text style={{marginRight: 10}}>{
            confirmedNumber > selectedNumber ? 
            'Lower' : 'Higher'} than {confirmedNumber}
            </Text>
            <Ionicons name={confirmedNumber > selectedNumber ? 'ios-arrow-down': 'ios-arrow-up'} size={17} color='black' />
          </View> :
            <Text>A number between 1 and 99</Text>
        }
        {/* </MainButton> */}
        {/* <MainButton >
          <Ionicons name='md-add' size={25} color={secondaryColor} />
        </MainButton> */}
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
    width: '90%',
    padding: 5
  },
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: '80%',
    padding: 5
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
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%', // for smaller devices
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%'
  },
  quitStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 25
  }

});

export default GameScreen;