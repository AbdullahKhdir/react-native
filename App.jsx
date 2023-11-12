import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack/'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';

const Stack            = createNativeStackNavigator();
const screenOptions    = {};
const allPlacesOptions = ({ navigation }) => ({
  headerRight: ({tintColor}) => {
    return (
      <IconButton 
        iconName='add' 
        size={24} 
        color={tintColor} 
        onPress={() => navigation.navigate('AddPlace')}
      />
    );
  }
});

const addPlacesOptions = {};

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} options={allPlacesOptions}/>
          <Stack.Screen name='AddPlace' component={AddPlace}  options={addPlacesOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}