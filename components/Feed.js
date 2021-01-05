import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList,
  Alert } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Post from './Post'

function Feed(props) {
  const [numPosts, setNumPosts] = useState("")
  const [intermed, setIntermed] = useState("")
  const [latestPosts, setLatestPosts] = useState([])

  const getCount = async () => {
    try {
      const n = await AsyncStorage.getItem("numPosts")
      if (n === null) {
        await startCount()
        n = await AsyncStorage.getItem("numPosts")
        setNumPosts(n)
      } else {
        setNumPosts(n)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const startCount = async () => {
    try {
      await AsyncStorage.setItem("numPosts", "0")
    } catch(err) {
      console.log(err)
    }
  }

  const addCount = async () => {
    try {
      let n = await AsyncStorage.getItem("numPosts")
      n = Number(n)
      n += 1
      await AsyncStorage.setItem("numPosts", n.toString())
      await getCount()
    } catch(err) {
      console.log(err)
    }
  }

  const subCount = async () => {
    try {
      let n = await AsyncStorage.getItem("numPosts")
      n = Number(n)
      n -= 1
      await AsyncStorage.setItem("numPosts", n.toString())
      await getCount()
    } catch(err) {
      console.log(err)
    }
  }

  const post = async () => {
    if (intermed === "") return
    try {
      const jsonValue = {
        id: numPosts,
        user: props.nickname,
        time: (new Date()).toLocaleString(),
        body: intermed
      }
      await AsyncStorage.setItem(numPosts, JSON.stringify(jsonValue))
      await addCount()
      setLatestPosts(oldArray => [jsonValue, ...oldArray])
      setIntermed("")
    } catch(err) {
      console.log(err)
    }
  }

  const deleteLatest = async () => {
    try {
      const i = Number(numPosts) - 1
      if (i < 0) return
      await AsyncStorage.removeItem(JSON.stringify(i))
      await subCount()
      latestPosts.shift()
    } catch(err) {
      console.log(err)
    }
  }

  const getPost = async (key) => {
    try {
      key = JSON.stringify(key)
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null
      ? JSON.parse(jsonValue)
      : null;
    } catch(err) {
      console.log(err)
    }
  }

  function renderPost(json) {
    return (
      <View onStartShouldSetResponder={() => true}>
        <Post key={json.item.id} name={json.item.user} time={json.item.time} body={json.item.body} />
      </View>
    )
  }

  const initLatestPosts = async () => {
    if (latestPosts.length > 0) return
    let j = Number(numPosts) - 1
    let res = []

    while (j >= 0) {
      await getPost(j)
      .then(post => res.push(post))
      j -= 1
    }

    setLatestPosts(res)
  }

  useEffect(() => {
    getCount()
  }, [])

  useEffect(() => {
    initLatestPosts()
  }, [numPosts])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {styles.container}>
        <View style = {styles.header}>
          <Button
            buttonStyle={{backgroundColor: '#9370DB'}}
            icon={<Icon
                    name="chevron-left"
                    size={20}
                    color="white"
                  />}
            onPress={() => {
              Alert.alert('Warning', 'Are you sure you want to log out?', [
                {text: 'No'},
                {text: 'Yes', onPress: () => props.updateName(null)}
              ])
            }}
          />

          <Text style = {{color: '#fff'}}>Welcome, {props.nickname}!</Text>

          <Button
            buttonStyle={{backgroundColor: '#9370DB'}}
            icon={<Icon
                    name="trash"
                    size={20}
                    color="white"
                  />}
            onPress={() => {
              Alert.alert('Warning', 'Are you sure you want to delete your latest post?', [
                {text: 'No'},
                {text: 'Yes', onPress: () => deleteLatest()}
              ])
            }}
          />
        </View>


        <FlatList
          data={latestPosts}
          renderItem={item => renderPost(item)}
          keyExtractor={item => item.id}
          ListFooterComponent=<Text style = {styles.count}>{numPosts} posts found</Text>
        />


        <KeyboardAvoidingView style={styles.postFunc} keyboardVerticalOffset={20} behavior='padding'>
          <TextInput
            style={styles.input}
            placeholder="Enter comment"
            value={intermed}
            onChangeText={setIntermed}
            maxLength={300}
          />
          <Button
            buttonStyle={{height: 45, backgroundColor: '#9370DB'}}
            icon={<Icon
                    name="arrow-up"
                    size={30}
                    color="white"
                  />}
            onPress={() => post()}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FBEAEB',
  },
  header: {
    backgroundColor: '#005353',
    padding: 4,
    marginBottom: 5,
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  count: {
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: 3,
    color: '#7F7F7F',
    marginBottom: 58,
  },
  postFunc: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    height: 45,
    padding: 5,
    borderColor: '#808080',
    borderWidth: 1,
  },
});

export default Feed;
