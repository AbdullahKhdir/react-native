import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, shouldGameBeOver] = useState(true);
  const [getGuessRounds, setGuessRounds] = useState(0);

  const [isFontLoading] = useFonts(
    {
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf')
    }
  );

  if (!isFontLoading) {
    return <AppLoading />
  }

  function startNewGameHandler () {
    setUserNumber(null);
    setGuessRounds(0);
    //? when the numbers get matches no need to set shouldGameBeOver to true
    //? because the shouldGameBeOver is already will be set to true in the 
    //? function gameOverHandler()
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    shouldGameBeOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    shouldGameBeOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (isGameOver && userNumber) {
    screen = <GameOverScreen 
                userNumber={userNumber}
                roundsNumber={getGuessRounds}
                onStartNewGame={startNewGameHandler}
              />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});