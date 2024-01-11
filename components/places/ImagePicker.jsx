import { PermissionStatus, launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default ImagePicker = ({onTakeImage}) => {
    const [picked_image, setPickedImage] = useState();
    
    //? ios camera permission "requestPermission"
    const [camera_permission_information, requestPermission] = useCameraPermissions();
    
    async function verifyPermissions() {
        if (camera_permission_information.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (camera_permission_information.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const is_camera_permission_granted = await  verifyPermissions();
        
        if (!is_camera_permission_granted) {
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
            onTakeImage(image === null ? {} : image.assets[0]);
        }).catch(() => {/** handle canceled image capturing */});
    }

    let image_preview = <Text>No image taken yet.</Text>

    if (typeof picked_image === 'object') {
        if ('uri' in picked_image) {
            image_preview = <Image 
                source={{uri: picked_image.uri}} 
                style={styles.image}    
            />; 
        }
    }

    return (
        <>
            <View>
                <View style={styles.imagePreview}>
                    { image_preview }
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
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});