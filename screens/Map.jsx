import { Alert, StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { renderMapAfterTime } from "../util/time";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Colors } from "../constants/colors";
import IconButton from "../components/ui/IconButton";

export default function Map({ navigation, route }) {
    // todo on opening screen directly    
    const latitude       = route?.params?.lat || 49.447446;
    const longitude      = route?.params?.lng || 11.077384;
    const latitudeDelta  = 0.0922;
    const longitudeDelta = 0.0421;
    
    const mapStyle                         = renderMapAfterTime();
    const [getCoordinates, setCoordinates] = useState(null);
    const mapRef                           = useRef(null);
    
    function selectLocationHandler(event) {
        const { coordinate }          = event.nativeEvent;
        const { latitude, longitude } = coordinate;
        setCoordinates({ latitude, longitude });
    }

    function handleCenter() {
        mapRef.current.animateToRegion(
            {
                latitude, 
                longitude,
                latitudeDelta,
                longitudeDelta
            }
        );
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!getCoordinates) {
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }

        navigation.navigate(
            'AddPlace',
            {
                latitude:  getCoordinates.latitude,
                longitude: getCoordinates.longitude
            }
        )
    }, [navigation, getCoordinates, route]);

    useLayoutEffect(function() {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton 
                    iconName='save'
                    color={tintColor}
                    size={24}
                    onPress={savePickedLocationHandler}
                />
            ) 
        })
    }, [navigation, getCoordinates, route]);
    
    return(
        <MapView 
            ref={mapRef}
            style={styles.fullscreenMap}
            initialRegion={
                {
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                }
            }
            region={
                {
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                }
            }
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            userLocationPriority="high"
            userLocationUpdateInterval={1000 * 60}
            followsUserLocation={true}
            userLocationCalloutEnabled={true}
            showsPointsOfInterest={false}
            onPress={selectLocationHandler}
            onMapReady={handleCenter}
        >
            {
                (!isNaN(route?.params?.lat) && !isNaN(route?.params?.lng)) ? 
                    <Marker
                        coordinate = {
                            {
                                latitude: route?.params?.lat,
                                longitude: route?.params?.lng
                            }
                        }
                        title="My Location" 
                    /> 
                    :
                    null
            }
            {
                getCoordinates 
                &&
                <Marker
                    coordinate = {
                        {
                            latitude: getCoordinates.latitude,
                            longitude: getCoordinates.longitude,
                            longitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta
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