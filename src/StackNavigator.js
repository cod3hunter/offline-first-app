import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CreateUserScreen,
  AccessScreen,
  PostScreen,
  PostListScreen,
  SplashLoadingScreen,
} from './modules';
import {HeaderButtons} from './library';
import {COLORS} from './constants';
import {logoutUser} from './store/actions';

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
  console.log(userId);
  const dispatch = useDispatch();
  if (userId) {
    return (
      <Stack.Navigator
        initialRouteName="SplashLoading"
        screenOptions={screenOptions}>
        <Stack.Screen
          name="SplashLoading"
          component={SplashLoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Posts"
          component={PostListScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <HeaderButtons
                onLogoutPress={() => dispatch(logoutUser())}
                onAddPress={() => navigation.navigate('Post')}
              />
            ),
          })}
        />
        <Stack.Screen name="Post" component={PostScreen} />
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
