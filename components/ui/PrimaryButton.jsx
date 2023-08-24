import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function PrimaryButton({ children, onPress, style }) {

    return (
        <View style={[styles.buttonOuter, style]}>
            <Pressable 
                style={
                    (pressedData) => pressedData.pressed ? 
                        [styles.buttonInner, styles.pressed] 
                        : 
                        styles.buttonInner
                } 
                onPress={onPress} android_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText} >{ children }</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuter: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInner: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75
    }
});