import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default IconButton = ({ iconName, size, color, onPress }) => {
    return(
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            android_ripple={{color: '#ccc'}}>
                <Ionicons name={iconName} size={size} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            padding: 5,
            margin: 4,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pressed: {
            opacity: 0.7
        }
    }
);