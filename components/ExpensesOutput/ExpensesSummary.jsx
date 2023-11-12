import { Text, View, StyleSheet, TextBase } from "react-native";
import { GLobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ periodName, expenses, fallBackText }) {
    //? increment sum of expenses
    let expensesSum = 0;
    if (expenses.expenses) {
        expensesSum = expenses.expenses.reduce((sum, expense) => {
            return sum + expense.amount;
        }, 0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{ periodName }</Text>
            <Text style={styles.sum}>${ expensesSum.toFixed(2) }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GLobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GLobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GLobalStyles.colors.primary500 
    }
});