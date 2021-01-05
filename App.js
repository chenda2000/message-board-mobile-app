import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Login from './components/Login';
import Feed from './components/Feed';

export default function App() {
  const [name, setName] = useState(null)

  function enter(nickname) {
    if (nickname !== "") setName(nickname)
  }

  return (
    name === null ?
    <Login updateName={enter}/> :
    <Feed nickname={name} updateName={enter}/>
  );
}
