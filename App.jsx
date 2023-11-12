import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import RecentExpenseScreen from './screens/RecentExpenseScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import { GLobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/ui/IconButton';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  const Stack      = createNativeStackNavigator(); 
  const BottomTabs = createBottomTabNavigator(); 
  
  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator 
        screenOptions={({ navigation }) => (
          {
            headerStyle: {
              backgroundColor: GLobalStyles.colors.primary500
            },
            headerTintColor:   GLobalStyles.colors.white,
            tabBarStyle: {
              backgroundColor: GLobalStyles.colors.primary500
            },
            tabBarActiveTintColor: GLobalStyles.colors.accent500,
            headerRight: ({tintColor}) => <IconButton 
              icon='add' 
              size={24} 
              color={tintColor} 
              onPress={() => navigation.navigate('ManageExpense')} 
            />,
          }
        )}
      >
        <BottomTabs.Screen 
          name='AllExpenses' 
          component={AllExpensesScreen} 
          options={
            {
              title:       'All Expenses',
              tabBarLabel: 'All Expenses',
              tabBarIcon:   ({color, size}) => {
                return <Ionicons name='calendar' size={size} color={color} />
              },
            }
          }   
        />
        <BottomTabs.Screen 
          options={
            {
              title:       'Recent Expenses',
              tabBarLabel: 'Recent',
              tabBarIcon:   ({ color, size }) => {
                return <Ionicons name='hourglass' size={size} color={color} />
              },
            }
          } 
          name='RecentExpenses' 
          component={RecentExpenseScreen} 
        />
      </BottomTabs.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light"/>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={() => (
            {
              headerStyle: {
                backgroundColor: GLobalStyles.colors.primary500
              },
              headerTintColor:   GLobalStyles.colors.white,
            }
          )}
          >
            <Stack.Screen name='ExpenseOverview' component={ExpensesOverview} options={{headerShown: false}} />
            <Stack.Screen
              name='ManageExpense' 
              component={ManageExpenseScreen} 
              options={{
                title: 'Manage Expense',
                presentation: 'modal',
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}