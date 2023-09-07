import { View, Text, StyleSheet } from 'react-native';

export function Subtitle({ children, style, textStyle}) {
    return (
        <View style={[styles.subtitleContainer, style]}>
            <Text style={[styles.subtitle, textStyle]}>{ children }</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        subtitle: {
            color: '#e2b497',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
            textAlign: 'center',
        },
        subtitleContainer: {
            marginHorizontal: 12,
            marginVertical: 4,
            padding: 6,
            borderBottomColor: '#e2b497',
            borderBottomWidth: 2,

        }
    }
);