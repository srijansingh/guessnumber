import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import color from '../constants/color'

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.bold}>The Game is Over</Text>
            <View style={styles.imageContainer}>
                <Image 
                fadeDuration={1000}
                    style={styles.image} 
                    // source={require('../assets/success.png')} resizeMode="cover"
                    source={{uri:'https://overpriced.design/wp-content/uploads/2017/03/ToWin-long.gif'}}

                />
            </View>
           <View style={styles.bodytext}>
           <BodyText>Your number was <Text style={styles.normal}>{props.userNumber}</Text> and guessed by your phone in <Text style={styles.normal}>{props.roundNumber}</Text> rounds</BodyText>
           </View>
            
            
            <MainButton onPress={props.newGame}>New Game</MainButton>
        </View>
    )
}

export default GameOver

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    bold:{
        fontFamily:'open-sans-bold',
        fontSize:20
    },
    bodytext:{
        width:'80%',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:10
        
    },
    normal:{
        color:color.primary,
        
    },
    
    imageContainer:{
        width:300,
        height:300,
        borderRadius:150,
        overflow:'hidden',
        marginVertical:20
    },
    image:{
        width:'100%',
        height:'100%',

    }
})
