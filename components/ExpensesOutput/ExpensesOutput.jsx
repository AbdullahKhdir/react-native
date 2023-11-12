import { View, StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GLobalStyles } from "../../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTION } from '@env';
import { fetchExpenses } from "../../redux/expenses";
import { DUMMY_EXPENSES } from "../../data/dummy_expenses";
import { LoadingOverlay } from "../ui/LoadingOverlay";

export function ExpenseOutput({ expensePeriod , fallBackText }) {
    const expenses = useSelector((state) => state.expenses);
    const refresh  = useSelector((state) => state.expenses.refresh);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const value = JSON.parse(await AsyncStorage.getItem('expenses')) ?? [];
                
                if (value.length === 0 && PRODUCTION === 'false') {
                    await AsyncStorage.setItem('expenses', JSON.stringify(DUMMY_EXPENSES));
                } else if (value.length === 0 && PRODUCTION === 'true') {
                    await AsyncStorage.removeItem('expenses')
                    await AsyncStorage.setItem('expenses', JSON.stringify({}));
                }
                
                const after_setting_values = await AsyncStorage.getItem('expenses');
                dispatch(fetchExpenses(JSON.parse(after_setting_values != null ? after_setting_values : [])));
            } catch (error) {
                //? Error retrieving data
                console.log(error);
            }
        })();
    }, [refresh]);

    const isFetchingDone = useSelector(state => state.expenses.isFetched);
    let content = <LoadingOverlay/>;

    if (isFetchingDone) {
        content = (
            <View style={styles.container}>
                <ExpensesSummary expenses={expenses} periodName={expensePeriod}/>
                <ExpensesList expenses={expenses} fallBackText={fallBackText}/>
            </View>
        );
    }

    return (
        <>
            { content }  
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GLobalStyles.colors.primary700,
    },
});