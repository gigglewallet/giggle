import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image, Text } from 'react-native'
import { Colors, Metrics } from '../../themes'

export default class Index extends React.Component {
    state = { bgColor: '#D8D8D8' }

    setBgColor = bgColor => e => {
        this.setState({ bgColor })
    }

    render() {
        const { bgColor } = this.state
        const { img, text, onPress, topText, outerStyle, btnSize, textStyle, iconSize } = this.props
        const addBtnStyle = btnSize ? { height: btnSize, width: btnSize, borderRadius: btnSize / 2 } : {}
        const addIconStyle = iconSize ? { height: iconSize, width: iconSize } : {}
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={this.setBgColor('#AAAAAA')}
                onPressOut={this.setBgColor('#D8D8D8')} >
                <View style={[styles.align, outerStyle]}>
                    {topText && <Text style={styles.topText}>{topText}</Text>}
                    <View style={[styles.shadow, { backgroundColor: bgColor }, addBtnStyle]}>
                        <Image style={[styles.icon, addIconStyle]} source={img} />
                    </View>
                    {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                </View>
            </TouchableWithoutFeedback >
        )
    }
}

const styles = StyleSheet.create({
    align: {
        alignItems: 'center',
    },
    shadow: {
        backgroundColor: '#D8D8D8',
        height: Metrics.ovalButtonDefaultSize,
        width: Metrics.ovalButtonDefaultSize,
        borderRadius: Metrics.ovalButtonDefaultSize / 2,
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
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 20,
        color: Colors.ovalButtonText,
        fontSize: Metrics.ovalButtonFontSize,
        textAlign: 'center',
    },
    topText: {
        marginBottom: 20,
        color: Colors.ovalButtonText,
        fontSize: Metrics.ovalButtonFontSize,
    },
});