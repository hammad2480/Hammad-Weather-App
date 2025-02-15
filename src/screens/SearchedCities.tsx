import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SearchBar from '../components/searchBar';
import SearchUI from '../components/serachUI';
import {fetchWeather, loadCities} from '../network/services';
import {toggleUnit} from '../store/temperatureSlice';
import * as Animatable from 'react-native-animatable';
import SwitchToggle from 'react-native-switch-toggle';
import {darkTheme, lightTheme} from '../utils/theme';
import {toggleTheme} from '../store/themeSlice';
import {useFocusEffect} from '@react-navigation/native';
import WeatherCard from '../components/weatherCard';
import ListEmptyComponent from '../components/listEmptyComponent';
import Header from '../components/header';

const SearchedCities = ({navigation}) => {
  const unit = useSelector(state => state.temperature.unit);
  const theme = useSelector(state => state.theme.mode);
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
  const [weatherData, setWeatherData] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [txt, setTxt] = useState('');
  const [screenFocus, setScreenFocus] = useState(false);
  const dispatch = useDispatch();

  const handleBackPress = useCallback(() => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCities(setSearchedCities);
      setScreenFocus(true);
      setTimeout(() => {
        setScreenFocus(false);
      }, 1000);
    }, []),
  );

  const getWeatherData = useCallback(async city => {
    if (!city) {
      setWeatherData([]);
      return;
    }

    const connectionInfo = await NetInfo.fetch();

    if (connectionInfo.isConnected) {
      try {
        const data = await fetchWeather(city);
        setWeatherData(data);
        await AsyncStorage.setItem(`offline_${city}`, JSON.stringify(data));
      } catch (error) {
        console.error('Network Error:', error);
      }
    } else {
      try {
        const storedData = await AsyncStorage.getItem(`offline_${city}`);
        if (storedData) {
          setWeatherData(JSON.parse(storedData));
        } else {
          setWeatherData([]);
        }
      } catch (error) {
        console.error('Error getting data!', error);
      }
    }
  }, []);

  const renderWeatherCard = ({item}) => (
    <Animatable.View
      duration={1000}
      animation={screenFocus ? 'fadeInDown' : ''}>
      <WeatherCard item={item} navigation={navigation} />
    </Animatable.View>
  );

  const renderEmptyComponent = () => (
    <Animatable.View duration={1000} animation={screenFocus ? 'fadeInUp' : ''}>
      <ListEmptyComponent txt={'No Recent Searches!'} />
    </Animatable.View>
  );

  return (
    <LinearGradient colors={themeStyles.gradient} style={styles.container}>
      <Header left={'40%'} title={'Dashboard'} onPress={handleBackPress} />
      <View style={styles.searchContainer}>
        <SearchBar
          onSearch={txt => {
            setTxt(txt);
            getWeatherData(txt);
          }}
          onFocusChange={focus => setSearchFocused(focus)}
        />
        <View>
          <SwitchToggle
            switchOn={theme === 'dark'}
            onPress={() => dispatch(toggleTheme())}
            buttonText={theme === 'dark' ? '🌙' : '☀️'}
            backgroundColorOff="grey"
            backgroundColorOn="#007bff"
            buttonTextStyle={styles.btnTxtStyle}
            containerStyle={styles.toggleContainer}
            circleColorOn="black"
            circleColorOff="black"
            circleStyle={styles.circleStyle}
          />
          <SwitchToggle
            switchOn={unit === 'F'}
            onPress={() => dispatch(toggleUnit())}
            buttonText={unit}
            backgroundColorOn="#007bff"
            backgroundColorOff="grey"
            buttonTextStyle={styles.btnTxtStyle}
            containerStyle={styles.toggleContainer}
            circleColorOn="white"
            circleColorOff="white"
            circleStyle={styles.circleStyle}
          />
        </View>
      </View>

      {searchFocused && txt ? (
        <SearchUI
          weatherData={weatherData}
          setSearchedCities={setSearchedCities}
          navigation={navigation}
        />
      ) : (
        searchedCities.length > 0 && (
          <>
            <Text style={styles.header}>Recently Searched</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyComponent}
              contentContainerStyle={styles.flatlistContainer}
              data={searchedCities}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              getItemLayout={(item, index) => ({
                length: 70,
                offset: 70 * index,
                index,
              })}
              keyExtractor={item => item.city}
              renderItem={renderWeatherCard}
            />
          </>
        )
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  flatlistContainer: {
    paddingTop: 10,
    paddingBottom: '20%',
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  btnTxtStyle: {fontFamily: 'Poppins-Bold', fontSize: 10},
  circleStyle: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 50,
    height: 20,
    borderRadius: 25,
    marginVertical: 3,
    padding: 5,
    bottom: 5,
  },
});

export default SearchedCities;
