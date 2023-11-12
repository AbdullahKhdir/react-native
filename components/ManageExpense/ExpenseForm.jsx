import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { GLobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useSelector } from "react-redux";

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, selectedExpense }) {
    const isUpdating = Object.keys(selectedExpense).length > 0;
    const  [getInput, setInput] = useState(
        {
            amount: {
                value: isUpdating ? selectedExpense.amount.toString() : '',
                isValid: true //? initially do not show an error validation message
            },
            date: {
                value: isUpdating ? selectedExpense.date : '',
                isValid: true
            },
            description: {
                value : isUpdating ? selectedExpense.description : '',
                isValid: true
            }
        }
    );

    const isFormValid = !getInput.amount.isValid || !getInput.date.isValid || !getInput.description.isValid;

    function inputChangedHandler(inputIdentifier, enteredValue) {
        //? inputIdentifier is either amount, date or description
        setInput((currentPrevValues) => {
            return {
                ...currentPrevValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    function submitHandler() {
        let dateIsValid = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(getInput.date.value) && getInput.date.value;
        
        const expenseDate = {
            amount: +getInput.amount.value.replaceAll(',', '.'),
            date:   getFormattedDate(new Date(getInput.date.value)),
            description: getInput.description.value.trim()
        };

        const amountIsValid = !isNaN(expenseDate.amount) && expenseDate.amount > 0;
        dateIsValid         = dateIsValid;
        const descriptionIsValid = expenseDate.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values');
            setInput((currentInputs) => ({
                amount: {
                    value: currentInputs.amount.value, 
                    isValid: amountIsValid
                },
                date: {
                    value: currentInputs.date.value, 
                    isValid: dateIsValid
                },
                description: {
                    value: currentInputs.description.value, 
                    isValid: descriptionIsValid
                }
            }));

            return;
        }

        //? callback to ManageExpenseScreen
        onSubmit(expenseDate);
    }

    return (
        <>
            <View style={styles.form}>
                <Text style={styles.title}>Your Expense</Text>
                <View style={styles.inputRow}>
                    <Input 
                        label='Amount'
                        invalid={!getInput.amount.isValid}
                        textInputConfig={{
                            keyboardType: 'decimal-pad',
                            onChangeText: inputChangedHandler.bind(this, 'amount'),
                            value: getInput.amount.value
                        }}
                        style={styles.rowInput}
                    />

                    <Input 
                        label='Date' 
                        invalid={!getInput.date.isValid}
                        textInputConfig={{
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: inputChangedHandler.bind(this, 'date'),
                            value: getInput.date.value
                        }}
                        style={styles.rowInput}
                    />
                </View>
                
                <Input label='Description' 
                       textInputConfig={{
                            multiline:   true,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                            onChangeText: inputChangedHandler.bind(this, 'description'),
                            value: getInput.description.value
                        }}
                        invalid={!getInput.description.isValid}
                />

                {isFormValid && <Text style={styles.errorText}>Invalid Input Values, please check your input data</Text>}

                <View style={styles.buttons}>
                    <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                    <Button style={styles.button} onPress={submitHandler}>{ submitButtonLabel }</Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    form: {
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: GLobalStyles.colors.error500,
        margin: 8
    }
});