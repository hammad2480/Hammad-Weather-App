import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import WeatherDetailCard from '../components/weatherDetailCard';
import {humidity, temperature, wind} from '../assets/svgs';
import {toggleFavorite} from '../store/favoriteSlice';
import LottieView from 'lottie-react-native';
import {getAnimationSource} from '../utils/functions';
import * as Animatable from 'react-native-animatable';
import {darkTheme, lightTheme} from '../utils/theme';
import Header from '../components/header';
import SuccessModal from '../components/modal'
import { useFocusEffect } from '@react-navigation/native';


const WeatherDetails = ({route, navigation}) => {
  const width = Dimensions.get('window').width;
  const unit = useSelector(state => state.temperature.unit);
  const theme = useSelector(state => state.theme.mode);
  const [animation, setAnimation] = useState(false);
  const [screenFocus, setScreenFocus] = useState(false);
  const [modal,setModal] = useState(false)
  const [modalTxt,setModalTxt] = useState('')
  
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
  const {cityData} = route.params;
  const dispatch = useDispatch();

  const isFavorite = useSelector(state =>
    state.favorites.favorites.some(item => item.city === cityData.city),
  );

  const convertTemperature = useCallback(temp => {
    return unit === 'F' ? (temp * 9) / 5 + 32 : temp;
  }, []);

    useFocusEffect(
      useCallback(() => {
        setScreenFocus(true);
        setTimeout(() => {
          setScreenFocus(false);
        }, 1000);
      }, []),
    );

  const handleFav = useCallback(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      dispatch(toggleFavorite(cityData));
    }, 1000);
    setModalTxt(`Favorite ${isFavorite?'removed':'added'} successfully!`)
    setModal(true)
    setTimeout(() => {
      setModal(false)
    }, 1000);
  }, [isFavorite]);

  return (
    <>
    <LinearGradient colors={themeStyles.gradient} style={styles.mainContainer}>
      <View style={styles.header}>
        <Header
          left={width / 3}
          title={'Weather'}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity onPress={handleFav}>
          <Animatable.Text
            duration={1000}
            animation={animation ? 'bounceIn' : ''}
            style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Animatable.Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lottieContainer}>
        <LottieView
          source={getAnimationSource(cityData.weather)}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.city}>{cityData.city}</Text>
      </View>
      <Animatable.View duration={1000} animation={screenFocus?'fadeInUp':''} style={styles.card}>
        <WeatherDetailCard
          icon={temperature}
          label="Temperature: "
          value={`${convertTemperature(cityData.temperature).toFixed(
            2,
          )}°${unit}`}
        />
        <WeatherDetailCard
          icon={wind}
          label="Wind Speed: "
          value={`${cityData.windSpeed} km/h`}
        />
        <WeatherDetailCard
          icon={humidity}
          label="Humidity: "
          value={`${cityData.humidity}%`}
        />
      </Animatable.View>
      <SuccessModal visible={modal} text={modalTxt} onClose={()=>setModal(false)}/>
    </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  lottieContainer: {
    width: '100%',
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '10%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  city: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },

  favoriteIcon: {
    fontSize: 20,
    bottom: 5,
  },
  animation: {width: '100%', height: '100%'},
  card: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: '30%',
    marginVertical: 5,
    width: '90%',
    borderRadius: 20,
  },
});

export default WeatherDetails;
