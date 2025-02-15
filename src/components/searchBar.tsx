import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { search } from "../assets/svgs";
import { useFocusEffect } from "@react-navigation/native";

const SearchBar = ({ onSearch, onFocusChange }) => {
  const [city, setCity] = useState("");

  useFocusEffect(
    useCallback(() => {
      return () => clearSearch()
    }, [])
  );

  const clearSearch = () => {
    setCity("");
    onSearch(""); 
  };

  return (
    <View style={styles.searchContainer}>
        <SvgXml width={20} height={20} xml={search} />
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor={'rgba(0,0,0,0.7)'}
        value={city}
        onFocus={() => onFocusChange(true)}
        onChangeText={(text) => {
          setCity(text);
          onSearch(text);
        }}
      />
      {city.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Text style={styles.clearText}>✖</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width:'80%',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor:'white'
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
    marginLeft: 5,
  },
  clearText: {
    fontSize: 16,
    color: "#888",
  },
});

export default memo(SearchBar);
