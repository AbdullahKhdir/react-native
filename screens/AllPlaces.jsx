import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";

export default AllPlaces = ({navigation, route}) => {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const is_focused = useIsFocused();
    
    useEffect(() => {
        if (is_focused && route.params) {
            setLoadedPlaces(currPlaces => [...currPlaces, route.params.place])
        }
    }, [is_focused, route]);

    return(
        <> 
            <PlacesList places={loadedPlaces}/>
        </>
    );
}