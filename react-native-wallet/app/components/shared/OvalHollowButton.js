import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'
import { Colors, Metrics } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { img, text, onPress } = this.props
        return (
            <TouchableOpacity
                onPress={onPress} activeOpacity={0.6} >
                <View style={styles.align}>
                    <View style={styles.shadow}>
                        <Image style={styles.icon} source={img} />
                    </View>
                    {text && <Text style={styles.text}>{text}</Text>}
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    align: {
        alignItems: 'center',
    },
    shadow: {
        height: Metrics.ovalButtonDefaultSize,
        width: Metrics.ovalButtonDefaultSize,
        borderRadius: Metrics.ovalButtonDefaultSize / 2,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // iOS
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        //Android
        elevation: 20,
    },
    icon: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        marginRight: 15,
    },
    text: {
        marginTop: 20,
        color: Colors.ovalButtonText,
        fontSize: Metrics.ovalButtonFontSize,
        textAlign: 'center',
    },
});