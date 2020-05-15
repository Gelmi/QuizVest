import React from 'react';

import Src from './src';
import Home from './src/screens/home';
import QuizScreen from './src/screens/quizscreen';
import Welcome from './src/screens/welcome';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setGlobal } from 'reactn';

const Stack = createStackNavigator();

export default function App() {  
  setGlobal({
    questoesmisturadas: []
  });

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="QuizScreen" component={QuizScreen}/>
        </Stack.Navigator>
      </NavigationContainer>  
  );
}


