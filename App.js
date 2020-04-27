import React from 'react';

import Src from './src';
import Home from './src/screens/home';
import QuizScreen from './src/screens/quizscreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="QuizScreen" component={QuizScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
