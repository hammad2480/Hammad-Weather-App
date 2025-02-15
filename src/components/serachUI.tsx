import React, { memo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import WeatherCard from './weatherCard';
import ListEmptyComponent from './listEmptyComponent';

const SearchUI = ({weatherData,setSearchedCities,navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={weatherData}
        ListEmptyComponent={<ListEmptyComponent txt={"No City Found!"}/>}
        keyExtractor={item => item.city}
        renderItem={({item}) => (
          <WeatherCard setSearchedCities={setSearchedCities} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  card: {
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5,
  },
  city: {fontSize: 18, fontWeight: 'bold'},
});

export default memo(SearchUI);
