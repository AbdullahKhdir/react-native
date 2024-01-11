import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import PlacesList from "../components/places/PlacesList";
import { Colors } from '../constants/colors';

export default AllPlaces = () => {
    const [loaded_places, setLoadedPlaces] = useState([]);
    const [is_loading, setIsLoading]       = useState(true);
    const is_focused                       = useIsFocused();

    function fetchPlaces() {
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

    //? over process execution 
    function deleteAllPlaces() {
        try {
            AsyncStorage.removeItem('place').then(() => {
                setIsLoading(true);
            });
        } catch(e) {
            console.log(e);
        }
    }

    function deletePlace(place) {
        try {
            AsyncStorage
                .getItem('place')
                .then((places) => {
                    setIsLoading(true);
                    if (places !== null) {
                        places = JSON.parse(places).filter((_place) => _place.id !== place.id);
                        AsyncStorage
                            .setItem('place', JSON.stringify(places))
                            .then(() => {
                                //? item was set
                                fetchPlaces();
                            });
                    }
                });
        } catch (e) {
            //! error reading value
            Alert.alert('Error', 'Something went wrong, please contact the support team!')
        }
    }

    useEffect(() => {
        if (is_focused) {
            //? AsyncStorage
            fetchPlaces();
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
                        <PlacesList places={loaded_places} onDelete={deletePlace} />
            }
        </>
    );
}