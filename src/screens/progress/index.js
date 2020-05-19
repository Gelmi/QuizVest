import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, AsyncStorage, BackHandler} from 'react-native';
import {hp, wp} from '../../utils/responsive';
import { useSelector } from 'react-redux';

// import { Container } from './styles';

const progress = ({ navigation }) => {

    let daysOfYearArray = [];
    const januaryFirst = new Date(new Date().getFullYear(), 0, 1);
    //console.log(new Date(januaryFirst.getTime() + (1 * 24 * 60 * 60 * 1000)));
    for(let i = 0; i<366 ;i++){
        daysOfYearArray[i] = new Date(januaryFirst.getTime() + i * 24 * 60 * 60 * 1000);
    //console.log(daysOfYearArray[i])
    }

    const relDay = useSelector(state => state.relDay);
    const progressArray = useSelector(state => state.progressArray);

    let relDaysOfWeekArray = [];

    for(let i = 0; i < 7 ; i++){
        relDaysOfWeekArray[i] = relDay + (-6+i);
    };


    //console.log(relDaysOfWeekArray);

    let scoreArray  = [0, 0, 0, 0, 0, 0, 0];
    let sizeArray = [0, 0, 0, 0, 0, 0, 0];;
    let daysArray = ['0','0','0','0','0','0','0'];
    relDaysOfWeekArray.forEach((element, index)=>{
        const month = daysOfYearArray[element].getMonth() + 1;
        scoreArray[index]=progressArray[element];
        daysArray[index]=(daysOfYearArray[element].getDate()+'/'+ month);
    })
    let arrayMax = 1;
    if(Math.max(...scoreArray) == 0){
        arrayMax = 1;
    } else {
        arrayMax = Math.max(...scoreArray);
    }
    scoreArray.forEach((element, index) => {
        sizeArray[index] = (30 * element)/(arrayMax);
    });

    //console.log(progressData);
  return (
    <View style={styles.container}>
        <View style={{ width:wp(90), height: hp(38), backgroundColor: '#121212'}}>
                {sizeArray.map((element, index) => 
                    <View key={index} style={{ width:wp(10), height: hp(30), backgroundColor: '#121212', position: 'absolute', bottom: hp(4), left: wp((12*index)+4), justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{ color: '#fff'}}>{scoreArray[index]}</Text>
                        <View style={{ width:wp(10), height: hp(element), backgroundColor: '#bb86fc'}}/>
                    </View>
                )}
            <View style={{ width:wp(86), height: hp(0.1), backgroundColor: '#fff', position: 'absolute', bottom: hp(4), alignSelf: "center" }}/>
                {daysArray.map((element, index) =>
                    <View key={index} style={{ width:wp(10), height: hp(2), backgroundColor: '#121212', position: 'absolute', bottom: hp(1), left: wp((12*index)+4), justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{ color: '#fff', fontSize: wp(3)}}>{element}</Text>
                    </View>
                )}
            <View style={{ width:wp(90), height: hp(38), backgroundColor: '#fff', opacity: 0.06, position: 'absolute'}}/>
        </View>
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
});

export default progress;