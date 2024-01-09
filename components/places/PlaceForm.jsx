import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default PlaceForm = () => {
    const [enteredTitle, setEnteredTitle] = useState();
    
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    return(
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
                </View>
                <ImagePicker style={styles.roundedCorners}/>
                <LocationPicker style={styles.roundedCorners}/>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        paddingTop: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 14,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 1,
        backgroundColor: Colors.primary100,
    },
    roundedCorners: {
        borderRadius: 10
    }
});