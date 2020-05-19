import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, BackHandler, Alert, AsyncStorage } from 'react-native';
import Questoes from './../../data/questions.json';
import Constants from "expo-constants";
import {hp, wp} from '../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useGlobal } from 'reactn';
// import { Container } from './styles';

let counter = 0;
//let progressCounter = 0;

export default function quizscreen({ navigation }) {
  
  //let selected = '';

  //function setSelected(text) {
  //  selected = text;
  //   console.log(selected);
  //}

  let scrollRef = null;
/* 
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    //return () =>
      //BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, []) */
  //const question = Questoes.questoes;
  const [relDay, setRelDay] = useGlobal('relDay');
  const [progressArray, setProgressArray] = useGlobal('progressArray');

  const [question, setQuestion] = useGlobal('questoesmisturadas');

  const nquestins = question.length;

  let ans = [];

  //let selected = new Array(nquestins);
  const [selected, setSelected] = useState('');

  const [checkState, setCheckState] = useState(0)

  const [answer, setAnswer] = useState('');
 
  const [questionStatus, setQuestionStatus] = useState(false);

  const [correctQuestions, setCorrectQuestions] = useState(0);

  const [progressCounter, setProgressCounter] = useState(counter);

  //const [progressData, setProgressData] = useState(counter);
  const selectButton = (array, text, index) => {
    array.pop();
    array.push(text)
  }

  const [array, setArray] = useState(new Array(nquestins));

  const changeArray = (index, text, answer) => {
    if(selected != text){
      setSelected(text);
    } else {
      setSelected('');
    };
    let arraySup = new Array(nquestins);
    arraySup = array;
    arraySup[index] = text; 
    setArray(arraySup);
    setAnswer(answer);
    //console.log(array);
  };

  // console.log("selected: "+selected);
  // console.log("checkState: "+checkState);
  // console.log("answer: "+answer);
  // console.log("questionStatus: "+questionStatus);
  // console.log("correctQuestions: "+correctQuestions);
  // console.log("counter: "+counter);
  // console.log("progressCounter: "+progressCounter)
  // const shuffledOptions = shuffle(q.options);
  // console.log("------------------------------------------");

  //let dataToday = [];
  const storeProgressData = async (value) => {
    try {
      await AsyncStorage.setItem(
        '@Progress:key',
        value
      );
    } catch (error) {
      // Error saving data
    }
  };

  const nextButton = (scrollRef, questionLenght) => {
    if(counter <= questionLenght-1){
      if(selected != ''){
        if(checkState == 0){
          if(selected == answer){
            setQuestionStatus(true);
            setCorrectQuestions(correctQuestions+1);
          } else { 
            setQuestionStatus(false);
          };
          setCheckState(1);
          setProgressCounter(progressCounter+1);
        } else {
          if(counter <= questionLenght-1){
            counter ++;
            scrollRef.scrollTo({x: wp(100*counter), y: 0, animated: true});
            setSelected('');
          } else {
            counter = 0;
            navigation.navigate("Welcome");
          }
          setCheckState(0);
          setQuestionStatus(false);
        }
      } else { 
        Alert.alert(
          'Ops',
          'Selecione uma opção antes de verificar',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
        //console.log('kk');
      }
    } else {
      counter = 0;
      const arrayP = progressArray;
      arrayP[relDay] = arrayP[relDay]+correctQuestions;
      storeProgressData(JSON.stringify(arrayP));
      setProgressArray(arrayP);
      setProgressCounter(0);
      navigation.navigate("Welcome");
    }
  }
  
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
                { checkState != 0 ?
                  (
                    questionStatus == true ? 
                    <Ionicons style={styles.iconStyle} name="md-checkmark-circle" size={32} color="green" />
                    :
                    <Ionicons style={styles.iconStyle} name="md-close-circle" size={32} color="red" />
                  )
                  :
                    <>
                    </>
                }
                <View style={{width: (wp(80)/nquestins)*(progressCounter), height: hp(0.5), backgroundColor: '#bb86fc', position: 'absolute', bottom: 0, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, zIndex: 2}}/>
                <View style={{width: wp(80), height: hp(0.5), backgroundColor: '#1f1f1f', position: 'absolute', bottom: 0, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, zIndex: 1}}/>
                <View style={styles.questionCardOverlay}/>
              </View>
              { q.options.map((text, id) => 
                <TouchableOpacity disabled={checkState == 0 ? false : true} key={id} style={selected == text ? styles.optionButtonSelected : styles.optionButton} onPress={() =>  changeArray(index, text, q.question.title)}>
                  <Text style={styles.optionText}>
                    {text}
                  </Text>
                  { checkState != 0 ?
                      questionStatus == false ? 
                        text == answer ?
                        <Ionicons style={styles.iconButtonStyle} name="md-checkmark-circle" size={32} color="green" />
                        :
                        <>
                        </>  
                      :
                      <>
                      </>
                    :
                    <>
                    </>
                  } 
                </TouchableOpacity >
                )
              }
            </View>
          ))
        }
        <View style={{ width: wp(100), alignItems: 'center', flex: 1}}> 
          <Text style={{ color: '#bb86fc', fontWeight: 'bold', fontSize: 64}}>{correctQuestions}/{nquestins}</Text>
          <Text style={{ color: '#bb86fc', fontWeight: 'bold', fontSize: 32}}>Questões</Text>
        </View>
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
            marginRight: wp(4),
            elevation: 8
          }}
          onPress={() => nextButton(scrollRef, nquestins)}
      >
        <Text style={styles.optionText, {fontWeight: 'bold'}}>
          { checkState != 0 ?
            "Proxima"
            :
            "Verificar" 
          }
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
    marginBottom: hp(5),
    elevation: 3
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
    marginTop: 5,
    elevation: 3
  },
  optionButtonSelected: {
    backgroundColor: '#854dc9',
    width: wp(80),
    height: hp(6),
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",   
    //marginTop: "2%"
    marginTop: 5,
    elevation: 3
  },
  optionText: {
    width: '100%',
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'center',
    //marginTop: "2%"
  },
  iconStyle: {
    position: 'absolute',
    bottom: hp(1),
    alignSelf: 'center'
  },
  iconButtonStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 8
  }
});

  