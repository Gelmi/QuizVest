import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Questoes from './../../data/questions.json';

// import { Container } from './styles';

function randomInt(max) {
	return Math.floor((max) * Math.random());
}

export default function quizscreen() {

  function generateQuiz() {

  };

  return (
    <View style={styles.container}>
    <TouchableOpacity 
        style={styles.startButton}
    >
        <Text style={styles.startButtonText}>Teste</Text>
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
      backgroundColor: '#bb86fc',
      width: '30%',
      height: '5%',
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center"
  },
  startButtonText: {
      fontWeight: "700",
      fontSize: 15
  },
});

  