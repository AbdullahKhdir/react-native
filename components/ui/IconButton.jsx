import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default IconButton = ({ icon_name, size, color, onPress, style }) => {
    return(
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [style ? style : {}, styles.button, pressed && styles.pressed]}
            android_ripple={{color: '#ccc'}}>
                <Ionicons name={icon_name} size={size} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pressed: {
            opacity: 0.7
        }
    }
);