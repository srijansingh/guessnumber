import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Card = (props) => {
    return (
        <View style={{...style.card, ...props.style}}>
           {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    card:{
        elevation:2,
        padding:10,
        backgroundColor:'#fff',
        borderRadius:10
    }
})

export default Card
