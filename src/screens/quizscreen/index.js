import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Questoes from './../../data/questions.json';
import Constants from "expo-constants";
import {hp, wp} from '../../utils/responsive'

// import { Container } from './styles';

let counter = 0;

export default function quizscreen({ navigation }) {

  //let selected = '';

  //function setSelected(text) {
  //  selected = text;
  //   console.log(selected);
  //}

  let scrollRef = null;

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
  
  function generateQuiz() {

  };

  const question = Questoes.questoes;

  const nquestins = question.length;

  let ans = [];

  //let selected = new Array(nquestins);
  const [selected, setSelected]= useState('');

  const nextButton = (scrollRef, questionLenght) => {
    if(selected != ''){
      if(counter <= questionLenght-2){
        counter ++;
        console.log(counter);
        scrollRef.scrollTo({x: wp(100*counter), y: 0, animated: true});
        setSelected('');
      } else {
        console.log('fim');
        counter = 0;
        navigation.navigate("Home");
      }
    }
  }

  const selectButton = (array, text, index) => {
    array.pop();
    array.push(text)
  }

  const [array, setArray] = useState(new Array(nquestins));

  const changeArray = (index, text) => {
    let arraySup = new Array(nquestins);
    console.log(array);
    arraySup = array;
    arraySup[index] = text; 
    setArray(arraySup);
    console.log(array);  
  };

  //const shuffledOptions = shuffle(q.options);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer} 
        horizontal={true} 
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { scrollRef = ref }}
      >
        {
          question.map((q, index) => (
            <View key={index} style={styles.questionView}>
              <View style={styles.questionCard}>
                {
                  q.question.contentType == 'image' ? <Image style={styles.questionImage} source={{
                    uri: q.question.content
                  }}/>
                  :
                  <Text style={styles.questionCardText}>{q.question.content}</Text>
                }
                <View style={styles.questionCardOverlay}></View>
              </View>
              { q.options.map((text, id) => 
                <TouchableOpacity key={id} style={array[index] == text ? styles.optionButtonSelected : styles.optionButton} onPress={() =>  changeArray(index, text)}>
                  <Text style={styles.optionText}>
                    {text}
                  </Text>
                </TouchableOpacity >
                )
              }
            </View>
          ))
        }
    </ScrollView>
    <View style={{ alignItems: 'flex-end'}}>
      <TouchableOpacity 
          style={{
            backgroundColor: '#bb86fc',
            width: wp(30),
            height: hp(6),
            borderRadius: 3,
            alignItems: "center",
            justifyContent: "center",   
            marginBottom: wp(4),
            marginRight: wp(4)
          }}
          onPress={() => nextButton(scrollRef, nquestins)}
      >
        <Text style={styles.optionText}>
          Ir
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionView: {
    width: wp(100), 
    alignItems : 'center'
  },
  questionCard: {
    backgroundColor: '#121212',
    width: wp(80),
    height: hp(25),
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
    marginBottom: hp(5)
  },
  questionCardOverlay: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    //alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    opacity: 0.08,
    borderRadius: 3
  },
  questionImage:{
    resizeMode: 'contain',
    height: hp(4)
  },
  questionCardText: {
    color: '#fff',
    width: '100%',
    textAlign: 'center'
  },  
  optionButton: {
    backgroundColor: '#bb86fc',
    width: wp(80),
    height: hp(6),
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",   
    //marginTop: "2%"
    marginTop: 5
  },
  optionButtonSelected: {
    backgroundColor: '#854dc9',
    width: wp(80),
    height: hp(6),
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",   
    //marginTop: "2%"
    marginTop: 5
  },
  optionText: {
    width: '100%',
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'center',
    //marginTop: "2%"
  },
});

  