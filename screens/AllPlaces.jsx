import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from 'react-native';
import PlacesList from "../components/places/PlacesList";
import { Colors } from '../constants/colors';

export default AllPlaces = () => {
    const [loaded_places, setLoadedPlaces] = useState([]);
    const is_focused                       = useIsFocused();

    useEffect(() => {
        if (is_focused) {
            //? AsyncStorage
            try {
                AsyncStorage
                    .getItem('place')
                    .then((places) => {
                        if (places !== null) {
                            setLoadedPlaces(JSON.parse(places));
                        }
                        // try {
                        //     AsyncStorage.removeItem('place');
                        // } catch(e) {
                        //     // remove error
                        // }
                    });
            } catch (e) {
                //! error reading value
            }
        }
    }, [is_focused]);

    if (loaded_places.length <= 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary700} />
            </View>
        );
    }

    return(
        <> 
            <PlacesList places={loaded_places} />
        </>
    );
}