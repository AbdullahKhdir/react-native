import { StyleSheet, View, Text } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorite-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

export default function FavoriteScreen() {
    // const contextApi    = useContext(FavoritesContext);
    // const favoriteMeals = MEALS.filter((meal) => contextApi.ids.includes(meal.id)); 
    
    const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
    const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id)); 
    let screen = <MealsList items={favoriteMeals}/>;
    
    if (favoriteMeals.length === 0) {
        screen = (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>
                    You have no favorite meals!
                </Text>
            </View>
        );   
    }

    return (
        <>
            {screen}
        </>
    );
}

const styles = StyleSheet.create(
    {
        rootContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white'
        }
    }
);