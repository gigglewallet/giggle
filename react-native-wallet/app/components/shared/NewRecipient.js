import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { ApplicationStyles, Images, Colors, Metrics } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { onPress } = this.props
        return (
            <TouchableOpacity style={styles.wrapper}
                onPress={onPress}
                activeOpacity={0.6}>
                <View style={styles.view}>
                    <Text style={styles.text}>{'New Recipient'}</Text>
                    <Image style={ApplicationStyles.headerIcon} source={Images.ic_add_white} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: Colors.darkGray,
    },
    view: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        fontSize: Metrics.headerFontSize,
        fontWeight: 'bold',
    },
});