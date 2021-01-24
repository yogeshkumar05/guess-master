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
  generateRandomNumber
} from '../../utils/helpers';
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
    infoText
  } = styles;

  const {
    primaryColor,
    secondaryColor
  } = COLORS;

  const {
    onStartGame
  } = props;
  const initialGuess = generateRandomNumber(1, 100, 0);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={screen}>
            <Text style={defaultStyles.titleText}>Guess the number !!</Text>
            <Ionicons name="bulb-outline" size={80} color={primaryColor} />
            <Text style={infoText}>In this fun game, the app will select a number from 1 to 99 and you guess it.</Text>
            <Card style={styles.summaryContainer}>
              <Text style={{ color: secondaryColor, fontWeight: 'bold' }}>App has already selected a number.</Text>
              <Text style={{ color: secondaryColor, fontWeight: 'bold' }}>Click on Start game to guess this number.</Text>
              <MainButton style={{ marginTop: 20 }} onPress={() => onStartGame(initialGuess)}>
                Start game
              </MainButton>
            </Card>
            <View>
              <Text style={{ marginTop: 30, fontStyle: 'italic' }}>
                <Ionicons name="information-circle-sharp" size={25} color='black' />
                Switch tabs at the bottom of the app to select a number and the app will guess it.
            </Text>
            </View>
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
    alignItems: 'center',
    height: '100%'
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
    marginTop: 10
  }
})

export default StartGameScreen;