import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { back } from '../assets/svgs';

interface HeaderProps {
  title: string;
  onPress: () => void;
  left?: number;      
  vertical?: number;  
}

const Header: React.FC<HeaderProps> = ({ title, onPress, left = 0, vertical = 0 }) => {
  return (
    <View style={[styles.container, { marginTop: vertical }]}>
      <TouchableOpacity onPress={onPress}>
        <SvgXml xml={back} width={26} height={26} />
      </TouchableOpacity>
      <Text style={[styles.title, { left }]}>{title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    position: 'absolute',
  },
});

export default memo(Header);
