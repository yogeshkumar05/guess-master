import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity
} from 'react-native';
import COLORS from '../constants/colors';

const {
  primaryColor
} = COLORS;

const MainButton = props => {
  const {
    children,
    onPress,
    style
  } = props;

  const {
    buttonView,
    buttonText
  } = styles;
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={{...buttonView, ...style}}>
        <Text style={buttonText}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});

export default MainButton;


