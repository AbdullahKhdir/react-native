import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ color, icon, onPress, androidRippleColor, iosRippleEffect }) {
    return (
        <>
            <Pressable 
                onPress={onPress} 
                style={({pressed}) => pressed && [styles.pressed, iosRippleEffect]}
                android_ripple={{color: androidRippleColor}}
                
                >
                <Ionicons name={icon} size={24} color={color} />
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: .4,
    }
});