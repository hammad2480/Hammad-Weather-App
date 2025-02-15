import React, { lazy, Suspense } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import { favorite, heartWhite, location, search, searchWhite } from '../assets/svgs';
import CurrentLocation from '../screens/currentLocation';
import { darkTheme, lightTheme } from '../utils/theme';
import { useSelector } from 'react-redux';
import LazyLoader from '../components/lazyLoader';

const SearchedCities = LazyLoader(()=>import('../screens/SearchedCities'))
const Favirotes = LazyLoader(()=>import('../screens/favirotes'))

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const theme = useSelector((state) => state.theme.mode);
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: themeStyles.background,
          height: 60,
          marginHorizontal: '5%',
          position: 'absolute',
          bottom: '2%',
          borderRadius: 100,
        },
        tabBarLabelStyle: {fontSize: 14},
      }}>
      <Tab.Screen
        name="Search"
        component={SearchedCities}
        options={{
          tabBarIcon: () => <SvgXml width={20} height={20} xml={searchWhite} />,
        }}
      />
          <Tab.Screen
        name="Current"
        component={CurrentLocation}
        options={{
          tabBarIcon: () => <SvgXml width={20} height={20} xml={location} />,
        }}
      />
       <Tab.Screen
        name="Favorites"
        component={Favirotes}
        options={{
          tabBarIcon: () => <SvgXml width={20} height={20} xml={heartWhite} />,
        }}
      />
    </Tab.Navigator>
  );
}