import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { ApplicationStyles, Images } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { goBack, title, bgColor } = this.props
        const bgStyle = bgColor ? { backgroundColor: bgColor } : {}
        return (
            <View style={[styles.header, bgStyle]}>
                <TouchableOpacity activeOpacity={0.6} onPress={goBack} style={styles.backWrapper}>
                    <Image style={ApplicationStyles.headerIcon} source={Images.button_left} />
                </TouchableOpacity>

                <Text style={ApplicationStyles.headerTitle}>{title}</Text>

                <View style={styles.empty} />
            </View>
        )
    }
}

const pad = 20
const styles = StyleSheet.create({
    header: {
        ...ApplicationStyles.navBar,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    empty: {
        width: ApplicationStyles.headerIcon.width + pad,
        height: 1,
    },
    backWrapper: {
        paddingLeft: pad,
    },
});