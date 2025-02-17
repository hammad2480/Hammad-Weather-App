import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import WeatherCard from '../components/weatherCard';
import {toggleFavorite} from '../store/favoriteSlice';
import {darkTheme, lightTheme} from '../utils/theme';
import {useFocusEffect} from '@react-navigation/native';
import ListEmptyComponent from '../components/listEmptyComponent';
import Header from '../components/header';
import SuccessModal from '../components/modal';

const Favorites = ({navigation}) => {
  const theme = useSelector(state => state.theme.mode);
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();
  const [removeItem, setRemoveItem] = useState(null);
  const [screenFocus, setScreenFocus] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalTxt, setModalTxt] = useState('');

  useFocusEffect(
    useCallback(() => {
      setScreenFocus(true);
      setTimeout(() => {
        setScreenFocus(false);
      }, 1000);
    }, []),
  );

  const RemoveFavorite = useCallback(item => {
    setRemoveItem(item.city);
    setTimeout(() => {
      dispatch(toggleFavorite(item));
      setRemoveItem(null);
    }, 500);
    setModalTxt('Favorite removed successfully!');
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  }, []);

  const renderItem = useMemo(() => {
    return ({item}) => (
      <Animatable.View
        animation={
          screenFocus
            ? 'fadeInDown'
            : removeItem === item?.city
            ? 'bounceOutLeft'
            : ''
        }
        duration={screenFocus ? 1000 : 500}>
        <WeatherCard
          item={item}
          navigation={navigation}
          isFavorite
          toggleFav={() => RemoveFavorite(item)}
        />
      </Animatable.View>
    );
  }, [screenFocus, removeItem, navigation, RemoveFavorite]);

  const renderEmptyComponent = () => (
    <Animatable.View duration={1000} animation={screenFocus ? 'fadeInUp' : ''}>
      <ListEmptyComponent txt={'No favorites found!'} />
    </Animatable.View>
  );

  return (
    <LinearGradient colors={themeStyles.gradient} style={styles.container}>
      <Header
        left={'42%'}
        title={'Favorites'}
        onPress={() => navigation.goBack()}
      />
      <FlatList
        data={favorites}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={item => item.city}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        getItemLayout={(item, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        renderItem={renderItem}
      />
      <SuccessModal
        visible={modal}
        onClose={() => setModal(false)}
        text={modalTxt}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  flatlistContainer: {
    paddingTop: 10,
    paddingBottom: '20%',
  },
  noFavorites: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'white',
  },
});

export default Favorites;
