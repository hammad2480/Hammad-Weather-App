import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { getAnimationSource, WeatherColors } from '../utils/functions';
import LottieView from 'lottie-react-native';
import { saveSearchedCity } from '../network/services';


interface WeatherCardProps {
  item: any;
  navigation: any; 
  isFavorite: boolean;
  toggleFav: () => void;
  setSearchedCities: (cities: WeatherData[]) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  item,
  navigation,
  isFavorite,
  toggleFav,
  setSearchedCities,
}) => {
  const unit = useSelector((state: any) => state.temperature.unit);
  const conditionalColor = item.weather === 'Rainy' ? 'white' : 'black';

  const convertTemperature = (temp: number): number => {
    return unit === 'F' ? (temp * 9) / 5 + 32 : temp;
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await saveSearchedCity(item, setSearchedCities, navigation);
        navigation.navigate('WeatherDetails', { cityData: item });
      }}
    >
      <LinearGradient colors={WeatherColors(item.weather)} style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={[styles.city, { color: conditionalColor }]}>
            {item.city}
          </Text>

          <Text style={[styles.condition, { color: conditionalColor }]}>
            {item.weather}
          </Text>
          <Text style={[styles.temp, { color: conditionalColor }]}>
            {convertTemperature(item.temperature).toFixed(1)}°{unit}
          </Text>
        </View>
        <View style={styles.favContainer}>
          {isFavorite ? (
            <TouchableOpacity onPress={toggleFav} style={styles.favBtn}>
              <Text>❤️</Text>
            </TouchableOpacity>
          ) : null}
          <LottieView
            source={getAnimationSource(item.weather)}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '50%',
    height: '100%',
  },
  favContainer: {
    width: '50%',
    height: '100%',
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  favBtn: {
    width: 20,
    height: 20,
  },
  condition: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    bottom: 5,
  },
  temp: {
    fontFamily: 'Nunito-Medium',
    fontSize: 30,
  },
  city: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  animation: {
    width: 100,
    height: 100,
  },
});

export default memo(WeatherCard);
