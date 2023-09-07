import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './screens/CategoriesScreen';
import MealDetailScreen from './screens/MealDetailScreen';
//? Adds navigation header to the app
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import { useLayoutEffect } from 'react';
import FavoriteScreen from './screens/FavoriteScreen';
import { IframeScreen } from './screens/IframeScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorite-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack  = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  //? the navigation property from the stack navigator and not the drawer
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation])

  return(
      <Drawer.Navigator 
        screenOptions={
          {
            headerStyle: {
              backgroundColor: '#351401'
            },
            headerTintColor: 'white',
            //? contentStyle for stack navigator
            //? sceneContainerStyle for stack drawer navigator
            sceneContainerStyle: {
              backgroundColor: '#3f2f05'
            },
            headerBackTitle: 'Back',
            drawerContentStyle: {
              backgroundColor: '#351401'
            },
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: '#351401',
            drawerActiveBackgroundColor: '#e4baa1',
            drawerType: 'slide',
            drawerHideStatusBarOnOpen: true,
            drawerStatusBarAnimation: 'fade',
            swipeEnabled: true
          }
        }
      >
        <Drawer.Screen 
          name='Categories' 
          component={CategoriesScreen} 
          options={{
              title: 'All Categories',
              drawerIcon: ({ color, size }) => {
                return <Ionicons name='list' size={size} color={color} />
              },
          }}
        />
        <Drawer.Screen
          name='FavoriteScreen'
          component={FavoriteScreen}
          options={{
            title: 'Favorite',
            drawerIcon: ({ color, size }) => {
              return <Ionicons name='star' size={size} color={color} />
            }
          }}  
        />
      </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={'transparent'} />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={
              {
                headerStyle: {
                  backgroundColor: '#351401'
                },
                headerTintColor: 'white',
                //? contentStyle for stack navigator
                //? sceneContainerStyle for stack drawer navigator
                contentStyle: {
                  backgroundColor: '#3f2f05'
                },
                headerBackTitle: 'Back'
              }
            } 
            initialRouteName="MealsCategories">
            {/* Registering the screen in navigation */}
            {/* <Stack.Screen  
              name='Iframe' 
              component={IframeScreen}
            /> */}
            <Stack.Screen  
              name='Drawer'
              component={DrawerNavigator}
            />
            <Stack.Screen
              name='MealsOverview' 
              component={MealsOverviewScreen}
            />
            <Stack.Screen
              name='MealDetails' 
              component={MealDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}