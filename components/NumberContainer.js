  import React from 'react';
  import {
    View,
    StyleSheet,
    Text
  } from 'react-native';
  import COLORS from '../constants/colors';

  const NumberContainer = props => {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>
          {props.children}
        </Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: COLORS.primaryColor,
      padding:10,
      borderRadius:10,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    number: {
      color: COLORS.primaryColor,
      fontSize: 22
    }
  });

  export default NumberContainer;
