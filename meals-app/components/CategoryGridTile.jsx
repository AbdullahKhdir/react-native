import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
// import { useNavigation } from "@react-navigation/native";

export default function CategoryGridTile({ title, color, onPress }) {
    //? Alternative to get the navigation object to switch between screens
    // const navigation = useNavigation();

    return(
        <View style={[styles.gridItemOuterView, {backgroundColor: color}]}>
            <Pressable 
                android_ripple={{color: '#000'}} 
                style={(pressedData) => [styles.buttonStyle, pressedData.pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={[styles.innerContainer, {backgroundColor: color}]}>
                    <Text style={styles.title}>
                        { title }
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonStyle: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.4,
    },
    gridItemOuterView: {
        flex:   1,
        margin: 16,
        // todo add dimensions 
        height: 150,
        borderRadius: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {height: 2, width: 0},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        //? backgroundColor to force shadow
        backgroundColor: '#fff',
        //? to make sure on press ripple does not go out beyond the rounded corners
        //? on IOS overflow should be visible to see shadow visible
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14
    }
});