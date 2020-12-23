import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import COLORS from '../constants/colors';

const Header = (props) => {

  const {
    title
  } = props;

  const {
    headerView,
    headerText
  } = styles;

  return (
    <View style={headerView}>
      <Text style={headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 90,
    paddingTop: 30,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Header;