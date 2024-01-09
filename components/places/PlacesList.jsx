import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';
import Place from './models/Place';

export default PlacesList = ({ places }) => {
    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.fallbackText}>No Places added yet!</Text>
            </View>
        );
    }
    
    return <FlatList
                style={styles.list}
                data={places} 
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
        list: {
            margin: 24
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        fallbackText: {
            fontSize: 14,
            color: Colors.primary200
        }
    }
);