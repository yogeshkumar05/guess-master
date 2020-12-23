import React from 'react';
import {
  TextInput,
  StyleSheet
} from 'react-native';

const Input = props => {

  const {input} = styles;
  return (
    <TextInput 
      {...props}
      style={{...input, ...props.style}}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
})

export default Input;