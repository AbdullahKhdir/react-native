import { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";

export default PlaceDetails = ({route, navigation}) => {
    function showOnMapHandler(place_param) {
        if (typeof place_param === 'object' && Object.keys(place_param).length > 0) {
            navigation.navigate(
                'Map',
                {
                    latitude: place_param.location.latitude,
                    longitude: place_param.location.longitude,
                    read_only: true,
                    title: place_param.title,
                }
            );
        }
    }

    const place_param = route?.params?.place;

    useEffect(() => {
        if (typeof place_param === 'object' && Object.keys(place_param).length > 0) {
            navigation.setOptions({title: place_param.title});
        }
    }, [place_param]);

    if (!place_param) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary700} />
            </View>
        );
    }

    const place_details = (
        <ScrollView>
            <Image style={styles.image} source={{uri: place_param.image}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place_param.address}</Text>
                </View>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler.bind(this, place_param)}>View on map</OutlinedButton>
        </ScrollView>
    );

    return (
        <>
            { typeof place_param === 'object' && Object.keys(place_param).length > 0 && place_details }
        </>
    ); 
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});