import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate("QuizScreen")}
        >
            <Text style={styles.startButtonText}>Começar</Text>
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

  
  
