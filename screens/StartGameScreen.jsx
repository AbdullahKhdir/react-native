import { TextInput, View, StyleSheet, Alert, Text } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/Colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

export default function StartGameScreen({ onPickNumber }) {
    const [getNumber, setNumber] = useState('');

    function numberInputHandler(number) {
        setNumber(number);
    }

    function resetInputHandler() {
        setNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(getNumber);
        
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number',
                'Number has to be a number between 1 and 99',
                [
                    {
                        text: 'Okay', 
                        style: 'destructive', 
                        onPress: resetInputHandler
                    }
                ] 
            );
        }

        onPickNumber(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess my number</Title>
            <Card>
                <InstructionText>Enter a number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoComplete='off'
                    onChangeText={numberInputHandler}
                    value={getNumber} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary700,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    numberInput: {
        textAlign: 'center',
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomWidth: 2,
        marginVertical: 8,
        borderBottomColor: Colors.accent500,
        color: Colors.accent500,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    }
});