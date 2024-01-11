
import { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

const SwipeableItem = ({ item, onDelete }) => {
    const translationX = useRef(new Animated.Value(0)).current;
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: translationX }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50) {
            // Swipe to delete threshold
            Animated.timing(translationX, {
              toValue: -100,
              duration: 200,
              useNativeDriver: false,
            }).start(() => onDelete());
          } else {
            Animated.spring(translationX, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;
  
    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [{ translateX: translationX }],
          },
        ]}
      >
        <RectButton style={styles.deleteButton} onPress={() => onDelete()}>
          <Text style={styles.deleteText}>Delete</Text>
        </RectButton>
        <PanGestureHandler {...panResponder.panHandlers}>
          <View style={styles.content}>
            <Text>{item.text}</Text>
          </View>
        </PanGestureHandler>
      </Animated.View>
    );
};
  
const PlaceSwipeableItem = ({place, onSelect}) => {
    const data = [
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
        { id: '3', text: 'Item 3' },
        // Add more items as needed
    ];

    const handleDelete = (id) => {
        // Implement your delete logic here
        console.log(`Deleting item with id: ${id}`);
    };

    return (
        <View style={styles.container}>
            {
                data.map((item) => (
                        <SwipeableItem key={item.id} item={item} onDelete={() => handleDelete(item.id)} />
                    )
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 50,
},
itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
},
content: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
},
deleteButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
},
deleteText: {
    color: '#fff',
},
});

export default PlaceSwipeableItem;
  