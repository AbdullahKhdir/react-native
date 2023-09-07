import { StyleSheet, View, FlatList } from 'react-native';
import MealItem from './MealItem';

export default function MealsList({ items}) {
    function renderMealItem(itemData) {
        const item = itemData.item;
        const mealItemProps = {
            imageUrl:       item.imageUrl,
            title:          item.title,
            affordability:  item.affordability,
            complexity:     item.complexity,
            duration:       item.duration,
            ingredients:    item.ingredients,
            steps:          item.steps,
        };

        //? {...Object} distribute the keys with values of the object to a new object
        return ( 
            <MealItem mealId={item.id} {...mealItemProps}/>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={items} 
                renderItem={renderMealItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});