import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses:  [],
    refresh:   [],
    isFetched: false,
  },
  reducers: {
    fetchExpenses: (state, action) => {
        state.expenses  = action.payload;
        state.isFetched = !!action.payload;
    },
    addExpense: (state, action) => {
        let id, description, amount, date = null;
        
        id          = action.payload.id;
        description = action.payload.description;
        amount      = action.payload.amount;
        date        = action.payload.date;

        (async () => {
            try {
                // await AsyncStorage.removeItem('expenses')
                const value = JSON.parse(await AsyncStorage.getItem('expenses')) ?? [];
                
                if (value.length > 0) {
                    value.unshift(
                      {
                        id,
                        description,
                        amount,
                        date
                      }
                    );
                    await AsyncStorage.setItem('expenses', JSON.stringify(value));
                }
            } catch (error) {
                //? Error retrieving data
            }
        })();
        
        state.refresh.push(true);
    },
    removeExpense: (state, action) => {
        const removedExpenseId = action.payload.id;
        
        (async () => {
          try {
              const value = JSON.parse(await AsyncStorage.getItem('expenses')) ?? [];
              
              if (value.length > 0) {
                  value.forEach(((expense, index) => {
                      if (expense.id === removedExpenseId) {
                        value.splice(index, 1);
                      }
                    }
                  ));
                  await AsyncStorage.setItem('expenses', JSON.stringify(value));
              }
          } catch (error) {
              //? Error retrieving data
          }
        })();
      
        state.refresh.push(true);
    },
    updateExpense: (state, action) => {
      const toUpdateId    = action.payload.id;
      const updatedObject = action.payload.updatedObject;

      (async () => {
        try {
            const value = JSON.parse(await AsyncStorage.getItem('expenses')) ?? [];
            
            if (value.length > 0) {
                value.forEach((expense, index) => {
                  if (toUpdateId === expense.id) {
                    value.splice(index, 1, updatedObject);
                  }  
                });
                await AsyncStorage.setItem('expenses', JSON.stringify(value));
            }
        } catch (error) {
          //? Error retrieving data
        }
      })();

      state.refresh.push(true);
    }
  }
});

export const addExpense    = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const fetchExpenses = expensesSlice.actions.fetchExpenses;
export default expensesSlice.reducer;