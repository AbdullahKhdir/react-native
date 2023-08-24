import { 
    Text, 
    StyleSheet, 
    View, 
    Image, 
    // Dimensions, 
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/Colors';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions();
    let imageSize = 300;

    if (width < 380 ) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    };

    return(
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}/>
                </View>
                <Text style={styles.summeryText}>
                    Your phone needed
                    &nbsp;<Text style={styles.highlight}>{roundsNumber}</Text>&nbsp; 
                    round to guess the number&nbsp;<Text style={styles.highlight}>{userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>
                    Start new game
                </PrimaryButton>            
            </View>
        </ScrollView>
    );
}

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        // Center content horizontally and vertically
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // width: 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: 150,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: 75,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summeryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});