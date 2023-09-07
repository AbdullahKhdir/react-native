import { createContext, useState } from 'react';

export const FavoritesContext = createContext(
    {
        ids: [],
        addFavorite: (id) => {},
        removeFavorite: (id) => {},
    }
);

export default function FavoritesContextProvider({ children }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id) {
        setFavoriteMealIds((currentFavState) => [...currentFavState, id]);
    }

    function removeFavorite(id) {
        setFavoriteMealIds((currentFavState) => currentFavState.filter((mealId) => mealId !== id));
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite,
        removeFavorite
    };

    return <FavoritesContext.Provider value={value}>{ children }</FavoritesContext.Provider>
}