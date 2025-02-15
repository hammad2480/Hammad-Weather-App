import React, { lazy, Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LazyLoader from '../components/lazyLoader';


const Landing = LazyLoader(() => import('../screens/landing'));
const WeatherDetails = LazyLoader(() => import('../screens/weatherDetails'));
const BottomTabs = LazyLoader(() => import('./bottomTabs'));

const Stack = createNativeStackNavigator();



const AppStack = () => {
  return (

      <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
      </Stack.Navigator>
  );
};

export default AppStack;
