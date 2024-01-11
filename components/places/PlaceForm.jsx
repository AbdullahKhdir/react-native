import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "./models/Place";

export default PlaceForm = ({onCreatePlace}) => {
    const [entered_title, setEnteredTitle] = useState(null);
    const [picked_location, setPickedLocation] = useState(null);
    const [selected_image, setSelectedImage] = useState(null);
    
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }
    
    //? using the hook useCallback to avoid unnecessary rerendering of the components or in this case recreating the following function
    //? which leads to running the useEffect in LocationPicker.jsx
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        if (!entered_title || !selected_image || !picked_location) {
            Alert.alert('Validation Error', 'Please fill in the title then pick an image and locate your address!');
            return;
        }
        
        onCreatePlace(new Place(entered_title, selected_image.uri, picked_location));
    }

    return(
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} onChangeText={changeTitleHandler} value={entered_title}/>
                </View>
                <ImagePicker style={styles.roundedCorners} onTakeImage={takeImageHandler} />
                <LocationPicker style={styles.roundedCorners} onPickLocation={pickLocationHandler} />
                <View style={styles.addPlaceButton}>
                    {/* <Button onPress={savePlaceHandler}>Add place</Button> */}
                    <OutlinedButton onPress={savePlaceHandler}>Add place</OutlinedButton>
                </View>
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
    },
    addPlaceButton: {
        marginBottom: 50
    }
});