import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function Post(props) {
  return (
    <View style = {styles.container}>
      <Text style = {styles.name}>{props.name}</Text>
      <Text style = {styles.body}>{props.body}</Text>
      <Text style = {styles.time}>{props.time}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#E5E5E5',
  },
  name: {
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#006677',
    color: '#fff',
  },
  body: {
    padding: 3,
    backgroundColor: '#fff',
  },
  time: {
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#fff',
    color: '#7F7F7F'
  }
});

export default Post;
