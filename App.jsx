import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack/';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';

// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack            = createNativeStackNavigator();
const screen_options    = {
  headerStyle: { backgroundColor: Colors.primary500 },
  headerTintColor: Colors.gray700,
  contentStyle: { backgroundColor: Colors.gray700 },
};
const allPlacesOptions = ({ navigation }) => ({
  headerRight: ({tintColor}) => {
    return (
      <IconButton
        icon_name='add'
        size={24}
        color={tintColor}
        onPress={() => navigation.navigate('AddPlace')}
      />
    )
  },
  title: 'Your favorite places'
});

const add_places_options = {
  title: 'Add new place'
};

const place_details_options = {
  title: 'Loading Place...'
};

const map_options = {
  title: '',
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTintColor: Colors.primary500,
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screen_options}>
            <Stack.Screen name='AllPlaces'    component={AllPlaces}    options={allPlacesOptions}/>
            <Stack.Screen name='AddPlace'     component={AddPlace}     options={add_places_options}/>
            <Stack.Screen name='Map'          component={Map}          options={map_options}/>
            <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={place_details_options}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}