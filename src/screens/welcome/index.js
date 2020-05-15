import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import {hp, wp} from '../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";
import { AsyncStorage } from 'react-native';

// import { Container } from './styles';

const Welcome = ({navigation}) => {

  const [username, setUsername] = useState(null);
  const [value, onChangeText] = React.useState('');
  
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
      } 
    } catch (error) {
      // Error retrieving data
    }
  };

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
              onPress={() => {}}
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