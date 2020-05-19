import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, BackHandler } from 'react-native';
import {hp, wp} from '../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";
import { AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

// import { Container } from './styles';

const Welcome = ({navigation}) => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [value, onChangeText] = React.useState('');
  const arraySize = new Array(366);
  const today =  new Date(new Date(Date.now()).setHours(0,0,0,0));
 
  function setRelDay(data) {
    dispatch({ type: 'SET_RELDAY', data: data});
  };

  function setProgressArray(data) {
    dispatch({ type: 'ADD_PROGRESS_ARRAY', data: data});
  };

  for(let i = 0; i<arraySize.length; i++){
    arraySize[i] = 0;
  };

  const _storeData = async (name) => {
    try {
      await AsyncStorage.setItem(
        '@Username:key',
        name
      );
      await _retrieveData('@Username:key')
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        setUsername(value);
        //console.log(value);
      } 
    } catch (error) {
      // Error retrieving data
    }
  };

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

  const retrieveProgressData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Progress:key');
      if (value !== null) {
        // We have data!!
        //console.log(JSON.parse(value));
        setProgressArray(JSON.parse(value));
        //console.log(progressArray);
        //console.log(value);
      } else {
        storeProgressData(JSON.stringify(arraySize));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const getRelDay = () => {
    const januaryFirst = new Date(new Date().getFullYear(), 0, 1);
    setRelDay((today.getTime()-januaryFirst.getTime())/(1000 * 3600 * 24));
  }

  useEffect(()=>{
    retrieveProgressData();
    getRelDay();
    //_retrieveData();
    //console.log(arraySize[365]);
    //storeProgressData(JSON.stringify(arraySize));
  },[])

  _retrieveData('@Username:key');

  return (
    <View style={styles.container}>
      {
        username == null ?
        <View style={styles.containerWlcome}>
           <Text style={{ color: '#bb86fc', fontSize: hp(5)}}>Bem vindo ao App!</Text>
           <Text style={{ color: '#bb86fc', fontSize: hp(3)}}>Como gostaria de ser chamado?</Text>
           <TextInput
            style={{ color: '#fff', height: 60, width: wp(80), paddingLeft: 15, fontSize: hp(2.5)}}
            onChangeText={text => {onChangeText(text)}}
            value={value}
            placeholder={'Fulano'}
            underlineColorAndroid={'#bb86fc'}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {_storeData(value)}}
          >
            <Text style={styles.backButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
        : 
        <>
        <Ionicons style={styles.iconStyle} name="md-settings" size={32} color="white" onPress={()=>{}}/>
        <Image style={styles.logo} source={require('../../assets/logos/LogoPurple.png')}/>
        <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.startButtonText}>Jogar Agora!</Text>
        </TouchableOpacity>
        <TouchableOpacity 
              style={styles.progressButton}
              onPress={() => navigation.navigate("Progress")}
        >
          <Text style={styles.startButtonText}>Progresso</Text>
        </TouchableOpacity>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0
  },
  containerWlcome: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(100)
  },
  logo: {
    resizeMode: 'contain',
    height: hp(30),
    marginTop: hp(15)
  },
  startButton: {
      backgroundColor: '#bb86fc',
      width: '80%',
      height: '5%',
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      marginTop: hp(10)
  },
  progressButton: {
    backgroundColor: '#bb86fc',
    width: '80%',
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
  iconStyle: {
    position: 'absolute',
    bottom: hp(1),
    top: hp(1) + Constants.statusBarHeight,
    right: hp(1.5)
  },
  backButton: {
    backgroundColor: '#bb86fc',
    width: '30%',
    height: '5%',
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    position: 'absolute',
    bottom: hp(2),
    right: hp(2), 
    elevation: 8
  },
  backButtonText: {
    fontWeight: "bold",
  }
});

export default Welcome;