import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './modules/Home/HomeScreen';

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ ...defaultScreenOptions }} initialRouteName="HomeScreen" >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
