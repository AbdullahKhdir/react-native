import { Pressable, Text, View, StyleSheet } from "react-native";
import { GLobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ description, amount, date, id }) {
    const navigation = useNavigation();
    function manageExpensePressHandler() {
        navigation.navigate(
            'ManageExpense',
            {
                description,
                amount,
                expenseId: id,
                date: date
            }
        );
    }

    return (
        <>
            <View>
                <Pressable 
                    style={({pressed}) => [styles.expenseItem, pressed ? styles.iosPressed : null]} 
                    android_ripple={{color: '#a2daff'}}
                    onPress={manageExpensePressHandler}
                >
                    <View>
                        <Text style={[styles.textBase, styles.description]}>{ description }</Text>
                        <Text style={[styles.textBase]}>{ date }</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amount}>${ amount.toFixed(2) }</Text>
                    </View>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 8,
        backgroundColor: GLobalStyles.colors.primary500,
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GLobalStyles.colors.grey500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GLobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GLobalStyles.colors.primary500,
        fontWeight: 'bold'
    },
    iosPressed: {
        opacity: 0.6
    }
});