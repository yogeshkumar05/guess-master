import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import defaultStyles from '../../constants/defaultStyles';
import COLORS from '../../constants/colors';
import MainButton from '../../components/MainButton';
const {
  secondaryColor,
  primaryColor
} = COLORS

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
    <ScrollView>
      <View style={screen}>
        <Text style={titleText}> The game is over :)</Text>
        <View style={imageContainer}><Image
          style={image}
          source={require('../../assets/success.png')}
          resizeMode='cover'

        />
        </View>
        <Text style={bodyText}>App took <Text style={highlight}>
          {guessRounds} </Text>
          rounds to guess the number <Text style={highlight}>
            {userNumber}
          </Text>
        </Text>
        <MainButton style={{backgroundColor: secondaryColor}} onPress={onRestart} >
          Start new game
      </MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    borderColor: 'black',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: secondaryColor,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default GameOverScreen;

