import { Image, View, StyleSheet, Pressable } from "react-native";

export default PlaceItem = ({ place, onSelect }) => {
    return(
        <>
            <Pressable 
                android_ripple={{color: '#ccc'}} 
                onPress={onSelect}
                style={{}}>
                    <Image source={{ uri: place.imageUri }}/>
                    <View>
                        <Text>{ place.title }</Text>
                        <Text>{ place.address }</Text>
                    </View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create(
    {
        
    }
);