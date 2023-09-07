import { useLayoutEffect} from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
// import { useRoute } from "@react-navigation/native";

export default function MealsOverviewScreen({ route, navigation }) {
    //? Alternative for the route prop
    // const route = useRoute();
    // const predefinedCategoryId = route.params.categoryId;
    const predefinedCategoryId = route.params.categoryId;
    const displayedMeals       = MEALS.filter(
        mealItem => mealItem.categoryIds.indexOf(predefinedCategoryId) >= 0
    );

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(
          (category) => category.id === predefinedCategoryId
        ).title;
    
        navigation.setOptions({
          title: categoryTitle,
        });
    }, [predefinedCategoryId, navigation]);

    return (
        <MealsList items={displayedMeals} />
    );
}
