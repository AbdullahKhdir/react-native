import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaceForm from "../components/places/PlaceForm";

export default AddPlace = ({navigation}) => {
    async function createPlaceHandler(place) {
        //? using AsyncStorage
        try {
            AsyncStorage.getItem('place').then((saved_place) => {
                if (saved_place !== null) {
                    saved_place = JSON.parse(saved_place);
                    saved_place.push(place)
                    
                    AsyncStorage
                        .setItem('place', JSON.stringify(saved_place))
                        .then(() => {
                            navigation.navigate('AllPlaces', {
                                place: saved_place
                            });
                        }).catch(error => Alert.alert('Error', 'Something went wrong, please try again later!'));
                } else {
                    AsyncStorage
                        .setItem('place', JSON.stringify([place]))
                        .then(() => {
                            navigation.navigate('AllPlaces', {
                                place: place
                            });
                        }).catch(error => Alert.alert('Error', 'Something went wrong, please try again later!'));
                }
            });
        } catch (e) {
            // saving error
        }
    }

    return(
        <>
            <PlaceForm onCreatePlace={createPlaceHandler}/>
        </>
    );  
}