import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function InstructionText({ children, style }){
 return (
    //** putting the style the last index to override the old style
    <Text style={[styles.instructionText, style]}>{ children }</Text>
 );
}

const styles = StyleSheet.create(
    {
        instructionText: {
            fontFamily: 'open-sans',
            color: Colors.accent500,
            fontSize: 14
        }
    }
);