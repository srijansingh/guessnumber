import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import Number from "../components/Number";
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndm = Math.floor(Math.random() * (max-min) + min);
    if(rndm === exclude){
        return generateRandomBetween(min,max,exclude);
    }else{
        return rndm;
    }
}




const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState(0);
    const [pastGuess, setPastGuess] =useState([initialGuess])
    const currentLow = useRef(1);
    const currentHight = useRef(100);

    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);



    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) ||
        (direction === 'greater' && currentGuess > props.userChoice))
        {
            Alert.alert('Do not lie!', 'You know this is wrong', [{text:'Sorry!', style:'cancel'}]);
            return;
        }
        if(direction === 'lower')
        {
            currentHight.current = currentGuess
        }else {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current,currentHight.current, currentGuess)
        setCurrentGuess(nextNumber);
        setRounds(curRound => curRound+1);
        setPastGuess(curPast => [nextNumber, ...curPast]);
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent Guess</Text>
            <Number>{currentGuess}</Number>
            <Card style={styles.buttons}>
            <View style={styles.btn}>
                
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons  name="md-remove" size={24} color="white"/>
                </MainButton>
            </View>
            <View style={styles.btn}>
        
                <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </View>

            </Card>
            <View style={styles.listing}>
            <ScrollView contentContainerStyle={styles.listContent}>
                {
                    pastGuess.map((guess,index)=> (
                        <Card style={styles.list}>
                            <BodyText>#{pastGuess.length-index}</BodyText>
                            <BodyText>{guess}</BodyText>
                        </Card>
                    ))
                }
            </ScrollView>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    },
    btn:{
        width:'45%'
    },
    list:{
        padding:15,
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%'

    },
    listing:{
        flex:1,
        width:'80%'
    },
    listContent:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    }
})
