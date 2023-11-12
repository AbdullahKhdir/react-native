import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GLobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense, addExpense, updateExpense } from "../redux/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";

export default function ManageExpenseScreen({ navigation, route }) {
    const editedExpenseId  = route.params?.expenseId;
    const isEditing        = !!editedExpenseId;
    const dispatch         = useDispatch();
    const {expenses}       = useSelector((state) => state.expenses);
    const selectedExpense  = expenses.filter(expense => expense.id === editedExpenseId)[0];
    const [isSubmitting, setSubmitting] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense' 
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        setSubmitting(true);
        dispatch(removeExpense({id: editedExpenseId}));
        setTimeout(() => {
            navigation.goBack();
        }, 1000)
    }

    function cancelExpenseHandler() {
        navigation.goBack();
    }

    function addExpenseHandler(expenseData) {
        setSubmitting(true);
        if (isEditing) {
            dispatch(updateExpense(
                {
                    id: editedExpenseId,
                    updatedObject: Object.assign(expenseData, {id: editedExpenseId})
                }
            ));            
        } else {
            const toBeAddedExpense = Object.assign(
                {id: new Date().getTime()},
                expenseData
            );

            dispatch(
                addExpense(toBeAddedExpense)
            );
        }
        setTimeout(() => {
            navigation.goBack();
        }, 1000)
    }

    if (isSubmitting) {
        return <LoadingOverlay/>; 
    }

    return (
        <>
            <View style={styles.container}>
                <ExpenseForm
                    onCancel={cancelExpenseHandler} 
                    submitButtonLabel={isEditing ? 'Update' : 'Add'}
                    onSubmit={addExpenseHandler}
                    selectedExpense={isEditing ? selectedExpense : {}}
                />
                { 
                    isEditing && 
                    <View style={styles.deleteContainer}>
                        <IconButton icon='trash' color={GLobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
                    </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GLobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GLobalStyles.colors.primary200,
        alignItems: 'center'
    }
});