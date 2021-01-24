import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Card from '../../components/Cards';
import COLORS from '../../constants/colors';
import Input from '../../components/Input';
import NumberContainer from '../../components/NumberContainer';
import defaultStyles from '../../constants/defaultStyles';
import MainButton from '../../components/MainButton';
import {
  Ionicons
} from '@expo/vector-icons';

const StartGameScreen = (props) => {
  const {
    screen,
    buttonView,
    inputContainer,
    button,
    input,
    infoText,
    quitStyle
  } = styles;

  const {
    primaryColor,
    secondaryColor
  } = COLORS;

  const {
    onStartGame
  } = props;

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = (inputText) => {
    // replace any character other than numbers with empty string 
    const validInputText = inputText.replace(/[^0-9]/g, '');
    setEnteredValue(validInputText);
  }

  const resetHandler = _ => {
    setEnteredValue('');
    setConfirmed(false);
  }

  // to avoid multiple event listeners being created
  useEffect(() => {
    // when the screen orientation changes
    const onDimensionChange = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }

    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionChange);
    }
  })

  const confirmHandler = _ => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number',
        'Number has to be greater than 0 and less than 100',
        [{ text: 'Ok', style: 'destructive', onPress: resetHandler }]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <Text>You selected: </Text>
      <NumberContainer>
        {selectedNumber}
      </NumberContainer>
      <MainButton style={{ backgroundColor: secondaryColor }} onPress={() => onStartGame(selectedNumber)}>
        Start game
      </MainButton>
    </Card>

  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={screen}>
            <Text style={defaultStyles.titleText}>Select a number !!</Text>
            <Ionicons name="happy-outline" size={80} color={secondaryColor} />
            <Text style={infoText}>In this fun game, you select a number from 1 to 99 and the app will guess it.</Text>
            <Card style={inputContainer}>
              <Text>Select a number</Text>
              <Input
                style={input}
                keyboardType='numeric'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={buttonView}>
                <View style={{ width: buttonWidth }}>
                  <Button title='Reset' color={primaryColor} onPress={resetHandler} />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button title='Confirm' color={secondaryColor} onPress={confirmHandler} />
                </View>
              </View>
            </Card>
            {
              confirmedOutput
            }
            <Text style={{ marginTop: 30, fontStyle: 'italic' }}>
            <Ionicons name="information-circle-sharp" size={25} color='black' />
              Switch tabs at the bottom of app to guess the number selected by app.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%', // for smaller devices
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%'
  },
  // button: {
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  infoText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20
  },
})

export default StartGameScreen;