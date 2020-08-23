import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGamesScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";


const fetchFont = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading 
              startAsync={fetchFont} 
              onFinish={()=>setDataLoaded(true)} 
            />;
  }

  const newGameHandler = () => {
    setGuessRound(0);
    setUserNumber(0);
  }

  const startGameHandler = selectNumber => {
    setUserNumber(selectNumber);
    setGuessRound(0)
  }

  const gameOverHandler = numRound => {
    setGuessRound(numRound)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if(userNumber && guessRound <=0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (guessRound > 0) {
    content = <GameOver newGame={newGameHandler} roundNumber={guessRound} userNumber={userNumber}  />;
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a number"/>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
