import React, { memo } from 'react';
import {View, Text, StyleSheet,Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import { weather } from '../assets/svgs';

const height = Dimensions.get('screen').height
const ListEmptyComponent = ({txt, isSmallList}) => (
  <View style={styles.emptyContainer}>
    <SvgXml
    xml={weather}
      width={isSmallList ? 100 : 200}
      height={isSmallList ? 100 : 200}
    />
    <Text style={styles.emptyText}>{txt}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    marginTop:height/6
  },
  emptyText: {
    fontSize: 22,
    color: 'white',
    fontFamily:'Poppins-Bold'
  },
});

export default memo(ListEmptyComponent);