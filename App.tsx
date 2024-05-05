/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import Login from './app/screens/auth/Login';
//import Signup from './app/screens/auth/Signup';
import FlashMessage from 'react-native-flash-message';

import Signup from './app/screens/Signup';
import Login from './app/screens/Login';
import Profile from './app/screens/Profile';
import Home from './app/screens/Home';
import AddTransaction from './app/screens/AddTransaction';
import BottomTabNavigation from './app/screens/BottomTabNavigation';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{headerShown: false}}
        />
 <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      
    <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{headerShown: false}}
        />    
           <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        
       
      </Stack.Navigator>
      <FlashMessage position={"bottom"} />
    </NavigationContainer>
    
  );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
