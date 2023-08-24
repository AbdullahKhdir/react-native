import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
//? docs.expo.dev to see all icons
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/games/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/games/GuessLogItem';

function generateRandomNumber(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    
    if (randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return randomNumber;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen(props) {
    //? Prevent max size stack reached to set min and max as fixed values
    const generateNumber = generateRandomNumber(1, 100, props.userNumber);
    const [getGuess, setGuess] = useState(generateNumber);
    const [guessRounds, setGuessRounds] = useState([generateNumber]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (getGuess === props.userNumber) {
            props.onGameOver(guessRounds.length);
        }
    }, [getGuess, props.userNumber, props.onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        if (direction === 'lower' && getGuess < props.userNumber // userNumber 50, getGuess 97 
        || direction === 'greater' && getGuess > props.userNumber) {
            Alert.alert(
                "Don't lie!",
                'You know that this is wrong...',
                [
                    {
                        text: 'Sorry!', 
                        style: 'default'
                    }
                ] 
            );
            return;
        }
        
        if (direction === 'lower') {
            maxBoundary = getGuess - 1;
        } else {
            minBoundary = getGuess + 1;
        }

        const generatedNumber = generateRandomNumber(minBoundary, maxBoundary, getGuess);
        setGuess(generatedNumber);
        setGuessRounds(prevGuess => [generatedNumber, ...prevGuess]);
    }

    const guessRoundsListLength = guessRounds.length; 
    let content                 =   <>
                                        <NumberContainer>{ getGuess }</NumberContainer>
                                        <Card>
                                            <InstructionText style={styles.instructionText}>
                                                Higher or lower?
                                            </InstructionText>
                                            <View style={styles.buttonsContainer}>
                                                <View style={styles.buttonContainer}>
                                                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}  >
                                                        <Ionicons name='md-remove' size={24} color='white' />
                                                    </PrimaryButton>
                                                </View>
                                                <View style={styles.buttonContainer}>
                                                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                                                        <Ionicons name='md-add' size={24} color='white' />
                                                    </PrimaryButton>
                                                </View>
                                            </View>
                                        </Card>
                                </>;

    if (width > 500) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}  >
                        <Ionicons name='md-remove' size={24} color='white' />
                    </PrimaryButton>
                </View>
                <NumberContainer>{ getGuess }</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </>;
    }

    return (
        <View style={ styles.screen }>
            <Title>Opponent's guess</Title>
            { content }
            <View style={styles.listContainer}>
                {/* { guessRounds.map((round, index) => <Text key={index}>{round}</Text>) }  */}
                <FlatList
                    data={guessRounds} 
                    renderItem={
                        (data) => <GuessLogItem guess={data.item} roundNumber={guessRoundsListLength - data.index}>{data.item}</GuessLogItem>
                    }
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
});