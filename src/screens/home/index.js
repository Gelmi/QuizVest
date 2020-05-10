import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function Home({ navigation }) {
  const [array, setArray] = useState(new Array(5));

  const changeArray = (index, text) => {
    let arraySup = new Array(5);
    console.log(array);
    arraySup = array;
    arraySup[index] = text; 
    setArray(arraySup);
    console.log(array);  
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate("QuizScreen")}
        >
            <Text style={styles.startButtonText}>Começar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => changeArray(1, 'b')}
        >
            <Text style={styles.startButtonText}>Seila</Text>
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

  
  
