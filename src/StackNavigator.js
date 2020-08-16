import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './modules/Home/HomeScreen';
import UserScreen from './modules/User/UserScreen';
import AddHeaderButton from './library/AddHeaderButton';
import {COLORS} from './constants';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.PRIMARY},
        headerBackTitleStyle: {color: 'white'},
        headerTitleStyle: {color: 'white'},
        headerPressColorAndroid: COLORS.DARK,
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <AddHeaderButton onPress={() => navigation.navigate('User')} />
          ),
        })}
      />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
}
