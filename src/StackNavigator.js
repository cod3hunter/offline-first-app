import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import CreateUserScreen from './modules/CreateUser/CreateUserScreen';
import AccessScreen from './modules/Access/AccessScreen';
import PostsScreen from './modules/Posts/PostsScreen';
import HeaderButtons from './library/HeaderButtons';
import {COLORS} from './constants';
import {logoutUser} from './store/ducks/UserDuck';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {backgroundColor: COLORS.PRIMARY},
  headerBackTitleStyle: {color: 'white'},
  headerTitleStyle: {color: 'white'},
  headerPressColorAndroid: COLORS.DARK,
  headerTintColor: 'white',
};

const StackNavigator = () => {
  const userId = useSelector((state) => state.user.data?.id);
  const dispatch = useDispatch();
  if (userId) {
    return (
      <Stack.Navigator initialRouteName="Posts" screenOptions={screenOptions}>
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <HeaderButtons
                onLogoutPress={() => dispatch(logoutUser())}
                onAddPress={() => console.log('go to add post')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator initialRouteName="Access" screenOptions={screenOptions}>
      <Stack.Screen
        name="Access"
        component={AccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{
          title: 'Criar Usuário',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
