import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Card from "../components/Card";
import Input from "../components/Input"
import Number from "../components/Number"
import colors from "../constants/color";
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const StartGamesScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState()
    
    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmHandler = () => {
        const chooseNumber = parseInt(enteredValue);
        if(isNaN(chooseNumber) || chooseNumber <=0 || chooseNumber>99){
            Alert.alert('Invalid Number', 'Number has to be between 1 and 99', [{text:'Okay', style:'destructive', onPress:resetHandler}])
            return;
        }
        setConfirmed(true);
       
        setSelectedNum(chooseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summary}>
                <BodyText>You selected</BodyText>
                <Number>{selectedNum}</Number>
                
                <MainButton onPress={()=> props.onStartGame(selectedNum)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
                
                    <Text>Enter Number</Text>
                    <View>
                        <Input 
                            keyboardType="number-pad" 
                            blurOnSubmit 
                            style={styles.input} 
                            maxLength={2} 
                            autoCorrect={false} 
                            value={enteredValue}
                            onChangeText={numberInputHandler}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <View style={styles.btn}>
                            
                            <MainButton onPress={resetHandler}>
                                RESET
                            </MainButton>
                        </View>
                        <View style={styles.btn}>
                            <MainButton onPress={confirmHandler}>
                                CONFIRM
                            </MainButton>
                        </View>
                    
                    </View>
           
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:350,
        maxWidth:"100%",
        alignItems:'center'
    },
    input:{
        width:50,
        textAlign:'center',
        fontFamily:'open-sans'
    },
    buttons:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    btn:{
        width:'48%',
        marginVertical:10
    },
    summary:{
        marginTop:20,
        alignItems:'center'
    }
})

export default StartGamesScreen
