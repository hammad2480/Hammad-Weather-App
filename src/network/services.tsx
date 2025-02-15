import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './helperService';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import axios from 'axios';
const API_KEY = '11c5edc2c2dd46b5d2e7b4384e4f9a14';

export const fetchWeather = async cityName => {
  try {
    const response = await axiosInstance.get('/weatherData');
    const data = await response.data;
    const filteredData = data.filter(item =>
      item.city.toLowerCase().includes(cityName.toLowerCase()),
    );
    return filteredData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchLiveWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};


export const saveSearchedCity = async (
  cityData,
  setSearchedCities,
  navigation,
) => {
  try {
    let storedCities = await AsyncStorage.getItem('searchedCities');
    storedCities = storedCities ? JSON.parse(storedCities) : [];

    if (!storedCities.find(c => c.city === cityData.city)) {
      storedCities.unshift(cityData);
      await AsyncStorage.setItem(
        'searchedCities',
        JSON.stringify(storedCities),
      );
      setSearchedCities(storedCities);
    }

    navigation.navigate('WeatherDetails', {cityData});
  } catch (error) {
    console.error('Error saving searched city:', error);
  }
};

export const loadCities = async setSearchedCities => {
  try {
    const storedCities = await AsyncStorage.getItem('searchedCities');
    if (storedCities) {
      setSearchedCities(JSON.parse(storedCities));
    }
  } catch (error) {
    console.error('Error loading searched cities:', error);
  }
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need your location to fetch weather details.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      Alert.alert('Error', 'Permission request failed.');
      return false;
    }
  }
  return true;
};
