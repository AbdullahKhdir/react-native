import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
// import PlaceItem from './PlaceItem';
import SwipeablePlaceList from './SwipeablePlaceList';

export default PlacesList = ({places, onDelete}) => {
    const navigation = useNavigation();

    function selectPlaceHandler(place) {
        navigation.navigate(
            'PlaceDetails',
            {
                place: place
            }
        );
    }

    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.fallbackText}>No places added yet!</Text>
            </View>
        );
    }
    
    return <FlatList
                style={styles.list}
                data={places} 
                key={
                    (item) => {
                        return item.id
                    }
                }
                renderItem={
                    ({item}) => {
                        // return <PlaceItem place={item} onSelect={selectPlaceHandler} />
                        return <SwipeablePlaceList place={item} onSelect={selectPlaceHandler} onDelete={onDelete} />
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