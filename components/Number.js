import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from "../constants/color";

const Number = (props)  =>{
    return (
        <View style={{...styles.number, ...props.styles}}>
            <Text style={styles.title}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    number:{
        borderWidth:2,
        borderColor:colors.primary,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        color:colors.accent,
       fontSize:22,
       fontFamily:'open-sans'
    }
})

export default Number;