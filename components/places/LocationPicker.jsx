import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useRef, useState } from "react";
import MapView, { AnimatedRegion, MarkerAnimated, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation, useRoute } from "@react-navigation/native";
import { renderMapAfterTime } from "../../util/time";

export default LocationPicker = () => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [getLocation, setLocation]                         = useState({});
    const [loading, setLoading]                              = useState(false);
    const mapRef                                             = useRef(null);
    const navigation                                         = useNavigation();
    const route                                              = useRoute();

    const mapStyle = renderMapAfterTime();
    
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }
    
    async function getLocationHandler() {
        setLoading(true);
        route.params = {};

        const isLocationPermissionGranted = await verifyPermissions();
      
        if (!isLocationPermissionGranted) {
            return;
        }

        const location = await getCurrentPositionAsync();

        if (typeof location === 'object') {
            if ('coords' in location) {
                setLocation(location.coords);
            }
        }
    }

    function handleCenter() {
        mapRef.current.animateToRegion(
          {
            latitude: getLocation.latitude,
            longitude: getLocation.longitude
          }
        );
    }
    
    function pickOnMapHandler() {
      setLocation({});
      navigation.navigate(
        'Map',
        {
          lat: getLocation.latitude,
          lng: getLocation.longitude
        }
      );
    }

    useEffect(function() {
      if (mapRef.current !== null) {
        mapRef.current.animateToRegion(
          {
            latitude: getLocation.latitude,
            longitude: getLocation.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0
          }
        );
      } else if (route?.params?.latitude && route?.params?.longitude) {
        setLocation(
          {
            latitude: route?.params?.latitude,
            longitude: route?.params?.longitude
          }
        );
      }

      setLoading(false);
    }, [mapRef, getLocation, navigation, route]);

    // todo
    let map = (
      !loading ? 
        <Text>No location defined yet</Text>
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary700} />
        </View>
    );

    if (typeof getLocation === 'object' && Object.keys(getLocation).length > 0) {
        map = (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: getLocation.latitude,
              longitude: getLocation.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0,
            }}
            region={{
              latitude: getLocation.latitude,
              longitude: getLocation.longitude,
            }}
            showsUserLocation={true}
            userLocationPriority="high"
            userLocationUpdateInterval={1000 * 60}
            followsUserLocation={true}
            userLocationCalloutEnabled={true}
            // showsMyLocationButton={true}
            showsPointsOfInterest={false}
            showsCompass={false}
            minZoomLevel={1}
            maxZoomLevel={17}
            loadingEnabled={false}
            moveOnMarkerPress={true}
            onMapLoaded={handleCenter}
            onMapReady={handleCenter}
            onRegionChange={handleCenter}
          >
            {
              (!isNaN(route?.params?.latitude) && !isNaN(route?.params?.longitude))
              &&
              <Marker 
                coordinate={
                  {
                    latitude: route?.params?.latitude,
                    longitude: route?.params?.longitude
                  }
                } 
                title="Picked Location"
                // description="Location"
              />
            }
          </MapView>
        );
    }
 
    return (
        <>
          <View style={styles.location_container}>
              <View style={styles.mapPreview}>
                  { map }
              </View>
              <View style={styles.actions}>
                  <OutlinedButton icon="location" onPress={getLocationHandler}>Locate user</OutlinedButton>
                  <OutlinedButton icon="map" onPress={pickOnMapHandler}       >Pick on map</OutlinedButton>
              </View>
          </View>
        </>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    location_container: {
        paddingBottom: 100
    },
    map: {
      width: '100%', 
      height: '100%'
    }
});