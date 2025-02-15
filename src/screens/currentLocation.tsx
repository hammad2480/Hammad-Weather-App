import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import {fetchLiveWeather, requestLocationPermission} from '../network/services';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {humidity, temperature, wind} from '../assets/svgs';
import WeatherDetailCard from '../components/weatherDetailCard';
import {darkTheme, lightTheme} from '../utils/theme';
import Header from '../components/header';

const CurrentLocation = ({navigation}) => {
  const theme = useSelector(state => state.theme.mode);
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const unit = useSelector(state => state.temperature.unit);

  const convertTemperature = temp => {
    return unit === 'F' ? (temp * 9) / 5 + 32 : temp;
  };

  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();
    }, [unit]),
  );

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Enable location services in settings.');
      setLoading(false);
      return;
    }
    setLoading(true);

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        try {
          const data = await fetchLiveWeather(latitude, longitude);
          setWeather({
            city: data.name,
            temperature: convertTemperature(data.main.temp - 273.15),
            weather: data.weather[0].description,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
          });
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch weather data.');
        } finally {
          setLoading(false);
        }
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return loading || !weather ? (
    <>
      <LinearGradient
        style={styles.loaderContainer}
        colors={themeStyles.gradient}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    </>
  ) : (
    <>
      <View style={[styles.header, {backgroundColor: themeStyles.background}]}>
        <Header
          left={'45%'}
          title={'Current Location'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <LinearGradient
        colors={themeStyles.gradient}
        style={styles.mainContainer}>
        <Text style={styles.city}>{weather?.city}</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getCurrentLocation}
            />
          }
          style={styles.scroll}>
          <View style={styles.weatherCard}>
            <Image source={{uri: weather?.icon}} style={styles.weatherIcon} />
            <Text style={styles.weatherCondition}>
              {weather?.weather.charAt(0).toUpperCase() +
                weather?.weather.slice(1)}
            </Text>
          </View>

          <View style={styles.card}>
            <WeatherDetailCard
              icon={temperature}
              label="Temperature: "
              value={`${weather?.temperature.toFixed(2)}°${unit}`}
            />

            <WeatherDetailCard
              icon={wind}
              label="Wind Speed: "
              value={`${weather?.windSpeed} km/h`}
            />

            <WeatherDetailCard
              icon={humidity}
              label="Humidity: "
              value={`${weather?.humidity}%`}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    padding: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  city: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginBottom: 10,
  },
  weatherCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 220,
    height: 150,
  },
  weatherCondition: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Nunito-Bold',
  },
  card: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: '60%',
    marginVertical: '5%',
    width: '90%',
    borderRadius: 20,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default CurrentLocation;
