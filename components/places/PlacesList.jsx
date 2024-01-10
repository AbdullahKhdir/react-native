// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused } from "@react-navigation/native";
// import { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

export default PlacesList = ({places}) => {
    // const [loaded_places, setLoadedPlaces] = useState();
    // const is_focused                       = useIsFocused();

    // useLayoutEffect(() => {
    //     if (is_focused) {
    //         // todo render loader
    //         try {
    //             AsyncStorage
    //                 .getItem('place')
    //                 .then((places) => {
    //                     if (places !== null) {
    //                         setLoadedPlaces(JSON.parse(places));
    //                     }
    //                     // try {
    //                     //     AsyncStorage.removeItem('place');
    //                     // } catch(e) {
    //                     //     // remove error
    //                     // }
    //                 });
    //         } catch (e) {
    //             //! error reading value
    //         }
    //     }
    // }, [is_focused]);

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
                        return item.id
                    }
                }
                renderItem={
                    ({item}) => {
                        return <PlaceItem place={item} />
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