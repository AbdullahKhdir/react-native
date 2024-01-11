import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { Colors } from "../../constants/colors";
import IconButton from "../ui/IconButton";

export default SwipeablePlaceList = ({ place, onSelect, onDelete }) => {
    function renderRightActionHanlder() {
        return (
            <TouchableOpacity>
                <IconButton
                    style={styles.swipeContainer}
                    icon_name='trash'
                    color={Colors.white}
                    size={24}
                    onPress={onDelete.bind(this, place)}
                />
            </TouchableOpacity>
        );
    }

    return(
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Swipeable renderRightActions={renderRightActionHanlder}>
                    <Pressable 
                        android_ripple={{color: '#ccc'}} 
                        onPress={onSelect.bind(this, place)}
                        style={({pressed}) => [styles.item, pressed && styles.pressed]}>
                            <Image style={styles.image} source={{ uri: place.image }}/>
                            <View style={styles.info}>
                                <Text style={styles.title}>{ place.title }</Text>
                                <Text style={styles.address}>{ place.address }</Text>
                            </View>
                    </Pressable>
                </Swipeable>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: '100%'
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    },
    swipeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'red',
        marginVertical: 13,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        paddingLeft: 5
    }
});