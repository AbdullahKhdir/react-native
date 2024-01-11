import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default IconButton = ({ icon_name, size, color, onPress }) => {
    return(
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            android_ripple={{color: '#ccc'}}>
                <Ionicons name={icon_name} size={size} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            padding: 10,
            // margin: 4,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pressed: {
            opacity: 0.7
        }
    }
);