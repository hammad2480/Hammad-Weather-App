import React, { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { clear, search } from "../assets/svgs";
import { useFocusEffect } from "@react-navigation/native";

interface SearchBarProps {
  onSearch: (text: string) => void;
  onFocusChange: (isFocused: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFocusChange }) => {
  const [city, setCity] = useState<string>("");

  const clearSearch = useCallback(() => {
    setCity("");
    onSearch("");
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => clearSearch();
    }, [])
  );

  return (
    <View style={styles.searchContainer}>
      <SvgXml width={20} height={20} xml={search} />
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="rgba(0,0,0,0.7)"
        value={city}
        onFocus={() => onFocusChange(true)}
        onChangeText={(text) => {
          setCity(text);
          onSearch(text);
        }}
      />
      {city.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <SvgXml width={20} height={20} xml={clear} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "84%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: "white",
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
