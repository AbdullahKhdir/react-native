import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from 'react-native';
import PlacesList from "../components/places/PlacesList";
import { Colors } from '../constants/colors';

export default AllPlaces = () => {
    const [loaded_places, setLoadedPlaces] = useState([]);
    const [is_loading, setIsLoading]       = useState(true);
    const is_focused                       = useIsFocused();

    useEffect(() => {
        if (is_focused) {
            //? AsyncStorage
            // try {
            //     AsyncStorage.removeItem('place');
            // } catch(e) {
            //     // remove error
            // }
            try {
                AsyncStorage
                    .getItem('place')
                    .then((places) => {
                        if (places !== null) {
                            setLoadedPlaces(JSON.parse(places));
                        }
                        setIsLoading(false);
                    });
            } catch (e) {
                //! error reading value
            }
        }
    }, [is_focused, is_loading]);

    const no_places_added = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.primary500, justifyContent: 'center', alignItems: 'center' }}>No places added yet, add some now!</Text>
        </View>
    );

    const loader = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary700} />
        </View>
    );

    return(
        <> 
            {
                loaded_places.length <= 0 ? 
                    (is_loading ? loader : no_places_added ) 
                    :
                    is_loading ? 
                        loader 
                        :
                        <PlacesList places={loaded_places} />
            }
        </>
    );
}