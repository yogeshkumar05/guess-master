import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
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
    buttonText,
    buttonContainer
  } = styles;

  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version > 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={buttonContainer}>
      <ButtonComponent onPress={onPress}>
        <View style={{ ...buttonView, ...style }}>
          <Text style={buttonText}>
            {children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  buttonView: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});

export default MainButton;


