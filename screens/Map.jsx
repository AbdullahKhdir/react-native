import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/colors";
import { getAddressFromCoordinates } from "../util/location";
import { renderMapAfterTime } from "../util/time";

export default function Map({ navigation, route }) {
    const latitude        = route?.params?.latitude  || 49.447446;
    const longitude       = route?.params?.longitude || 11.077384;
    const read_only_map   = route?.params?.read_only || false;
    const title           = route?.params?.title     || 'My Location';

    const latitude_delta  = 0.0922;
    const longitude_delta = 0.0421;
    
    const map_style                         = renderMapAfterTime();
    const [get_coordinates, setCoordinates] = useState(null);
    const [get_address, setAddress]         = useState('');
    const map_ref                           = useRef(null);
    
    function selectLocationHandler(event) {
        if (read_only_map === false) {
            const { coordinate }          = event.nativeEvent;
            const { latitude, longitude } = coordinate;
            setCoordinates({ latitude, longitude });
        }
    }

    function handleCenter() {
        map_ref.current.animateToRegion(
            {
                latitude, 
                longitude,
                latitude_delta,
                longitude_delta
            }
        );
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!get_coordinates) {
            Alert.alert(
                'Validation Error',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }

        navigation.navigate(
            'AddPlace',
            {
                latitude:  get_coordinates.latitude,
                longitude: get_coordinates.longitude
            }
        )
    }, [navigation, get_coordinates, route]);

    useLayoutEffect(function() {
        if (read_only_map === false) {
            navigation.setOptions({
                headerRight: ({tintColor}) => (
                    <IconButton 
                        icon_name='save'
                        color={tintColor}
                        size={24}
                        onPress={savePickedLocationHandler}
                    />
                ) 
            });
        }
    }, [navigation, get_coordinates, route]);

    useEffect(() => {
        async function fetchAddress() {
            if (get_coordinates || latitude || longitude) {
                let address = await getAddressFromCoordinates(get_coordinates ? get_coordinates.latitude : latitude, get_coordinates ? get_coordinates.longitude : longitude);
                setAddress(address);
            }
        }

        fetchAddress();
    });
    
    return(
        <MapView 
            ref={map_ref}
            style={styles.fullscreenMap}
            initialRegion={
                {
                    latitude,
                    longitude,
                    latitudeDelta: latitude_delta,
                    longitudeDelta: longitude_delta
                }
            }
            region={
                {
                    latitude,
                    longitude,
                    latitudeDelta: latitude_delta,
                    longitudeDelta: longitude_delta
                }
            }
            provider={PROVIDER_GOOGLE}
            customMapStyle={map_style}
            userLocationPriority="high"
            userLocationUpdateInterval={1000 * 60}
            followsUserLocation={true}
            userLocationCalloutEnabled={true}
            showsPointsOfInterest={false}
            onPress={selectLocationHandler}
            onMapReady={handleCenter}
        >
            {
                (!isNaN(route?.params?.latitude) && !isNaN(route?.params?.longitude)) ? 
                    <Marker
                        coordinate = {
                            {
                                latitude: route?.params?.latitude,
                                longitude: route?.params?.longitude
                            }
                        }
                        title={title}
                        description={get_address}
                    /> 
                    :
                    null
            }
            {
                get_coordinates 
                &&
                <Marker
                    coordinate = {
                        {
                            latitude: get_coordinates.latitude,
                            longitude: get_coordinates.longitude,
                            latitudeDelta: latitude_delta,
                            longitudeDelta: longitude_delta
                        }
                    }
                    pinColor={Colors.primary800}
                />
            }
        </MapView>
    ); 
}

const styles = StyleSheet.create({
    fullscreenMap: {
        width: '100%',
        height: '100%'
    }
});