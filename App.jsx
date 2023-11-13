import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack/'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';

const Stack            = createNativeStackNavigator();
const screenOptions    = {
  headerStyle: { backgroundColor: Colors.primary500 },
  headerTintColor: Colors.gray700,
  contentStyle: { backgroundColor: Colors.gray700 },
};
const allPlacesOptions = ({ navigation }) => ({
  headerRight: ({tintColor}) => {
    return (
      <IconButton
        iconName='add'
        size={24}
        color={tintColor}
        onPress={() => navigation.navigate('AddPlace')}
      />
    )
  },
  title: 'Your favorite places'
});

const addPlacesOptions = {
  title: 'Add new place'
};

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