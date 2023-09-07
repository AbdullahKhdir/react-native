import { useLayoutEffect } from "react";
import { Image, Text, View, StyleSheet, ScrollView, Button } from "react-native";
import MealDetails from "../components/MealDetails";
import { Subtitle } from "../components/MealDetail/Subtitle";
import { List } from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorite";

// import { useContext } from "react";
// import { FavoritesContext } from "../store/context/favorite-context";

export default function MealDetailScreen({ navigation, route }) {
    const title         = route.params.title;
    const duration      = route.params.duration;
    const affordability = route.params.affordability;
    const complexity    = route.params.complexity;
    const imageUrl      = route.params.imageUrl;
    const ingredients   = route.params.ingredients;
    const steps         = route.params.steps;
    const mealId        = route.params.mealId;
    // const contextApi    = useContext(FavoritesContext);
    // const isMealFavorite = contextApi.ids.includes(mealId);
    
    const dispatch = useDispatch();
    const favoriteMealIds = useSelector((state) => {
        return state.favoriteMeals.ids
    });

    const isMealFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (isMealFavorite) {
            dispatch(removeFavorite({id: mealId}));
            // contextApi.removeFavorite(mealId);
        } else {
            dispatch(addFavorite({id: mealId}));
            // contextApi.addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title,
                headerRight: () => {
                    return (
                      <>
                        <IconButton icon={isMealFavorite ? 'star' : 'star-outline'} color='white' onPress={changeFavoriteStatusHandler}/>
                      </>
                    );
                  }
            }
        );
    }, [title, navigation, changeFavoriteStatusHandler]);

    return(
        <>
            <ScrollView style={styles.rootContainer}>
                <Image style={styles.image} source={{uri: imageUrl}} />
                <Text style={styles.title}>{title}</Text>
                <MealDetails textStyle={styles.detailText} duration={duration} complexity={complexity} affordability={affordability}/>
                <View style={styles.wrapperListContainer}>
                    <View style={styles.listContainer}>
                        <Subtitle>Ingredients</Subtitle>
                        <List data={ingredients}/>
                        <Subtitle>Steps</Subtitle>
                        <List data={steps}/>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        maxWidth: '80%'
    },
    wrapperListContainer: {
        alignItems: 'center'
    },
    rootContainer: {
        marginBottom: 32 
    }
});