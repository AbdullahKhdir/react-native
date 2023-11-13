import { Text, FlatList, View, StyleSheet } from 'react-native';
import PlaceItem from './PlaceItem';
import Place from './models/Place';
import { Colors } from '../../constants/colors';

export default PlacesList = ({ places }) => {
    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.fallbackText}>No Places added yet!</Text>
            </View>
        );
    }
    
    return <FlatList
                data={list} 
                key={
                    (item) => {
                        if(item instanceof Place) {
                            return item.id
                        }
                    }
                }
                renderItem={
                    ({item}) => {
                        if(item instanceof Place) {
                            return <PlaceItem place={item} />
                        }
                    }
                }
            />
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        fallbackText: {
            fontSize: 16,
            color: Colors.primary200
        }
    }
);