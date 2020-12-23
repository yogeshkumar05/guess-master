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

const GameOverScreen = props => {
  const {
    screen,
    imageContainer,
    image
  } = styles;

  const {
    guessRounds,
    userNumber,
    onRestart
  } = props;
  
  return (
    <View style = {screen}>
      <Text style={defaultStyles.titleText}> The game is over :)</Text>
      <View style={imageContainer}><Image 
        style={image} 
        source={require('../assets/success.png')}

      />
      </View>
      <Text>Number of guesses: {guessRounds}</Text>
      <Text>User selected number: {userNumber}</Text>
      <Button title='Start new game' onPress={onRestart}/>
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
  }
});

export default GameOverScreen;

