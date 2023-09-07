import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable, Image, Platform } from "react-native";

export default function MealItem({ mealId, title, imageUrl, duration, complexity, affordability, ingredients, steps}) {
    const navigation = useNavigation();
    function pressHandler() {
        navigation.navigate(
            'MealDetails', 
            {
                mealId,
                title, 
                imageUrl, 
                duration, 
                complexity,
                affordability,
                ingredients,
                steps
            }
        );
    }

    return (
        <View style={styles.mealItem}>
            <Pressable 
                android_ripple={{color: '#dddddd'}}
                style={(pressedData) => pressedData.pressed ? styles.buttonPressed : null}
                onPress={pressHandler}>
                <View style={styles.innerContainer}>
                    <View>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                        <Text style={styles.title}>{ title }</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.detailItem}>{duration}m</Text>
                        <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
                        <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {height: 2, width: 0},
        shadowOpacity: 0.35,
        shadowRadius: 8,
        //? backgroundColor to force shadow
        backgroundColor: '#fff',
        //? to make sure on press ripple does not go out beyond the rounded corners
        //? on IOS overflow should be visible to see shadow visible
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    //? Shadow for ios and the line above is shadow for android
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8 
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12
    },
    buttonPressed: {
        opacity: .8,
    }
});