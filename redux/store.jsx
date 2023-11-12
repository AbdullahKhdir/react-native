import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from './expenses';

export const store = configureStore(
    {
        // preloadedState: {
        //     expenses: DUMMY_EXPENSES
        // },
        reducer: {
            expenses: expensesReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        })
    }
);