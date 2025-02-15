import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LazyLoader from '../components/lazyLoader';

const WeatherDetails = LazyLoader(() => import('../screens/weatherDetails'));
const BottomTabs = LazyLoader(() => import('./bottomTabs'));

const Stack = createNativeStackNavigator();



const AppStack = () => {
  return (

      <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
      </Stack.Navigator>
  );
};

export default AppStack;
