import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "./models/Place";

export default PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState(null);
    const [pickedLocation, setPickedLocation] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    
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
        if (!enteredTitle || !selectedImage || !pickedLocation) {
            Alert.alert('Validation error', 'Please fill in the title then pick an image and locate your address!');
            return;
        }
        
        onCreatePlace(new Place(enteredTitle, selectedImage.uri, pickedLocation));
    }

    return(
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
                </View>
                <ImagePicker style={styles.roundedCorners} onTakeImage={takeImageHandler} />
                <LocationPicker style={styles.roundedCorners} onPickLocation={pickLocationHandler} />
                <View style={styles.addPlaceButton}>
                    {/* <Button onPress={savePlaceHandler}>Add Place</Button> */}
                    <OutlinedButton onPress={savePlaceHandler}>Add Place</OutlinedButton>
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