import React, { memo, useCallback,} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import WeatherCard from './weatherCard';
import ListEmptyComponent from './listEmptyComponent';


interface SearchUIProps {
  weatherData: WeatherData[];
  setSearchedCities: (cities: WeatherData[]) => void;
  navigation: any; 
}

const SearchUI: React.FC<SearchUIProps> = ({ weatherData, setSearchedCities, navigation }) => {

  const renderItem = useCallback(({ item }) => (
      <WeatherCard 
        setSearchedCities={setSearchedCities} 
        item={item} 
        navigation={navigation} 
      />
    ),[]);

  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={weatherData}
        initialNumToRender={5}  
        maxToRenderPerBatch={5}
        getItemLayout={(item, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        ListEmptyComponent={<ListEmptyComponent txt="No City Found!" />}
        keyExtractor={(item) => item.city}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5,
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default memo(SearchUI);
