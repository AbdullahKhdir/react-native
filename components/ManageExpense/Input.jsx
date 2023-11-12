import { StyleSheet, Text, TextInput, View } from "react-native";
import { GLobalStyles } from "../../constants/styles";

export default function Input({ label, style, textInputConfig, invalid }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <>
            <View style={[styles.inputContainer, style]}>
                <Text style={[styles.label, invalid && styles.invalidLabel]}>{ label }</Text>
                <TextInput style={inputStyles} {...textInputConfig} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GLobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GLobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 14,
        color: GLobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 10,
    },
    invalidLabel: {
        color: GLobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GLobalStyles.colors.error50
    }
});