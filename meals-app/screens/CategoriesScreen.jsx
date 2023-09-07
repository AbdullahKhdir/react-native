import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import { FlatList } from 'react-native';

export default function CategoriesScreen({ navigation }) {
    function renderCategoryItem(data) {
        function pressHandler() {
            //? Name attribute of Stack.Screen 
            navigation.navigate(
                'MealsOverview', 
                {
                    categoryId: data.item.id
                }
            );
        }
    
        return (
            <CategoryGridTile 
                color={data.item.color} 
                title={data.item.title}
                onPress={pressHandler}
            />
        );
    }

    return(
        <>
            <FlatList
                data={CATEGORIES} 
                renderItem={renderCategoryItem} 
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </>  
    );
}
