import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Questoes from './../../data/questions.json';
import {hp, wp} from '../../utils/responsive';
import { AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

// import { Container } from './styles';

export default function Home({ navigation }) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  const setQuestions = (number, question) => {
    let arraySup = shuffle(question).slice(0, number);
    arraySup.forEach(element => {
      element.options = shuffle(element.options);
    });

    dispatch({ type: 'ADD_QUESTIONS', data: arraySup});
    //setActivePage("QuizScreen");
    navigation.navigate("QuizScreen"); 
  }

  async function getJsonFromApiAsync(number) {
    try {
      let response = await fetch(
        'https://raw.githubusercontent.com/Gelmi/QuizVest/master/src/data/questions.json'
      );
      let json = await response.json();
      //setQuestoesmisturadas(json);
      //const arraySup = json.slice(0, number);
      //console.log(json.questoes);
      setQuestions(number, json.questoes);
    } catch (error) {
      console.error(error);
    }
  }

  const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        setUsername(value);
      } 
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(()=>{
    _retrieveData('@Username:key');
  })

  return (
    <View style={styles.container}>
        <Text style={{ color: '#bb86fc', fontSize: hp(3), width: wp(80), textAlign: 'center'}}>Olá {username}, quantas questões quer responder?</Text>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => getJsonFromApiAsync(2)}
        >
            <Text style={styles.startButtonText}>2 Questões</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => getJsonFromApiAsync(4)}
        >
            <Text style={styles.startButtonText}>4 Questões</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={() => getJsonFromApiAsync(6)}
        >
            <Text style={styles.startButtonText}>6 Questões</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate("Welcome")}
        >
            <Text style={styles.backButtonText}>Voltar</Text>
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
        width: wp(80),
        height: '5%',
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(2)
    },
    startButtonText: {
        fontWeight: "700",
        fontSize: 15
    },
    backButton: {
      backgroundColor: '#bb86fc',
      width: '20%',
      height: '5%',
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      marginTop: hp(2),
      position: 'absolute',
      bottom: hp(2),
      left: hp(2), 
      elevation: 8
    },
    backButtonText: {
      fontWeight: "bold",
    }
  });

  
  
