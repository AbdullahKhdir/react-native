import { FlatList, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return (
        <>
            <ExpenseItem {...itemData.item} />
        </>
    );
}

export default function ExpensesList({ expenses, fallBackText }) {
    let content = <Text style={styles.text}>{ fallBackText }</Text>;
    
    if (expenses.expenses && expenses.expenses.length > 0) {
        content = (
            <>
                <FlatList 
                    data={expenses.expenses} 
                    renderItem={renderExpenseItem} 
                    keyExtractor={(item, index) => index}
                />
            </>
        );
    }

    return (
        <>
            { content }
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 32
    }
});