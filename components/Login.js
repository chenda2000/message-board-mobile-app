import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements';

function Login(props) {
  const [intermed, setintermed] = useState("")

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {styles.container}>
        <Text style = {styles.title}>GHETTO CHAT APP</Text>
        <TextInput
          style = {styles.input}
          placeholder="Enter nickname"
          onChangeText={setintermed}
          maxLength={15}
        />
        <Button
          title="Enter"
          buttonStyle={{backgroundColor: '#9370DB'}}
          onPress={() => props.updateName(intermed)}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CADAD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 35,
    padding: 5,
    marginBottom: 15,
    borderColor: '#808080',
    borderWidth: 1,
  },
  title: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 23,
  }
});

export default Login;
