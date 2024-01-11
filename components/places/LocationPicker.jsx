import { useNavigation, useRoute } from "@react-navigation/native";
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from "../../constants/colors";
import { getAddressFromCoordinates } from "../../util/location";
import { renderMapAfterTime } from "../../util/time";
import OutlinedButton from "../ui/OutlinedButton";

export default LocationPicker = ({onPickLocation}) => {
    const [location_permission_information, requestPermission] = useForegroundPermissions();
    const [get_location, setLocation]                          = useState({});
    const [loading, setLoading]                                = useState(false);
    const map_ref                                              = useRef(null);
    const navigation                                           = useNavigation();
    const route                                                = useRoute();

    const map_style = renderMapAfterTime();
    
    async function verifyPermissions() {
        if (location_permission_information.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (location_permission_information.status === PermissionStatus.DENIED) {
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

        const is_location_permission_granted = await verifyPermissions();
      
        if (!is_location_permission_granted) {
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
        map_ref.current.animateToRegion(
          {
            latitude: get_location.latitude,
            longitude: get_location.longitude
          }
        );
    }
    
    function pickOnMapHandler() {
      setLocation({});
      navigation.navigate(
        'Map',
        {
          lat: get_location.latitude,
          lng: get_location.longitude
        }
      );
    }

    useEffect(function() {
      if (map_ref.current !== null) {
        map_ref.current.animateToRegion(
          {
            latitude: get_location.latitude,
            longitude: get_location.longitude,
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
    }, [map_ref, get_location, navigation, route]);


    useEffect(() => {
      async function handleLocation() {
        if (Object.keys(get_location).length > 0) {
          onPickLocation({...get_location, address: await getAddressFromCoordinates(get_location.latitude, get_location.longitude)});
        }
      }

      handleLocation();
    }, [get_location, onPickLocation]);

    let map = (
      !loading ? 
        <Text>No location defined yet</Text>
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary700} />
        </View>
    );

    if (typeof get_location === 'object' && Object.keys(get_location).length > 0) {
        map = (
          <MapView
            ref={map_ref}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={map_style}
            initialRegion={{
              latitude: get_location.latitude,
              longitude: get_location.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0,
            }}
            region={{
              latitude: get_location.latitude,
              longitude: get_location.longitude,
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
        paddingBottom: 10
    },
    map: {
      width: '100%', 
      height: '100%'
    }
});