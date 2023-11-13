import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default ImagePicker = () => {
    const [pickedImage, setPickedImage] = useState();
    
    //? ios camera permission "requestPermission"
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    
    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const isCameraPermissionGranted = await  verifyPermissions();
        
        if (!isCameraPermissionGranted) {
            return;
        }

        setPickedImage({});
        launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            allowsMultipleSelection: false
        }).then((image) => {
            setPickedImage(image === null ? {} : image.assets[0]);
        }).catch(() => {/** handle canceled image capturing */});
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (typeof pickedImage === 'object') {
        if ('uri' in pickedImage) {
            imagePreview = <Image 
                source={{uri: pickedImage.uri}} 
                style={styles.image}    
            />; 
        }
    }

    return (
        <>
            <View>
                <View style={styles.imagePreview}>
                    { imagePreview }
                </View>
                <OutlinedButton icon='camera' onPress={takeImageHandler}>Take an image</OutlinedButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',  
        height: 200,  
        marginVertical: 8,  
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});