import React from 'react';
import { View, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function Src() {

  const AppContext = React.createContext({
    questoesmisturadas: []
  });

  return (
    <AppContext.Provider value={questoesmisturadas}>
      <View />
    </AppContext.Provider>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

