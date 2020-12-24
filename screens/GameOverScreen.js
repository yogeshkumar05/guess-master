import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image
} from 'react-native';
import defaultStyles from '../constants/defaultStyles';
import COLORS from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  const {
    screen,
    imageContainer,
    image,
    highlight
  } = styles;

  const {
    bodyText,
    titleText
  } = defaultStyles;

  const {
    guessRounds,
    userNumber,
    onRestart
  } = props;

  return (
    <View style={screen}>
      <Text style={titleText}> The game is over :)</Text>
      <View style={imageContainer}><Image
        style={image}
        source={require('../assets/success.png')}

      />
      </View>
      <Text style={bodyText}>Your phone took <Text style={highlight}>
        {guessRounds} </Text>
          rounds to guess the number <Text style={highlight}>
          {userNumber}
        </Text>
      </Text>
      <MainButton onPress={onRestart} >
        Start new game
      </MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 1,
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderColor: 'black',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: COLORS.primaryColor
  }
});

export default GameOverScreen;

