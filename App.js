import React from 'react';
import { BackHandler } from 'react-native'; 
import Src from './src';
import Home from './src/screens/home';
import QuizScreen from './src/screens/quizscreen';
import Welcome from './src/screens/welcome';
import Progress from './src/screens/progress';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setGlobal, useGlobal } from 'reactn';

const Stack = createStackNavigator();

export default function App() {  
  setGlobal({
    questoesmisturadas: [],
    relDay: 0,
    progressArray: [],
    activePage: 'Welcome',
  });

  const [activePage, setActivePage] = useGlobal('activePage');

  React.useEffect(() => {
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Progress" component={Progress}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="QuizScreen" component={QuizScreen}/>
        </Stack.Navigator>
      </NavigationContainer>  
  );
}


