import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { back } from '../assets/svgs';

const Header = ({ title,onPress,left,vertical}) => {
    return (
        <View style={[styles.container,{marginTop:vertical}]}>
            <TouchableOpacity onPress={onPress}>
                <SvgXml xml={back} width={26} height={26} />
            </TouchableOpacity>
            <Text style={[styles.title,{left:left}]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom:'2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontFamily:'Poppins-Bold',
        color:'white',
        position: 'absolute',
        transform: [{ translateX: -50 }],
    },
});

export default memo(Header);