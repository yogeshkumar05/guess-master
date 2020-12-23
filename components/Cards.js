import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const Card = (props) => {
  const {
    children,
    style
  } = props;
  const {card} = styles;
  return(
    <View style={{...card, ...style}}>
      {children}
    </View>
  )
}

const styles= StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    borderRadius: 10
  }
});

export default Card;