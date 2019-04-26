import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { ApplicationStyles } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { title, bgColor, leftImg, leftOnPress, rightImg, rightOnPress } = this.props
        const bgStyle = bgColor ? { backgroundColor: bgColor } : {}
        return (
            <View style={[styles.header, bgStyle]}>
                {leftImg ?
                    <TouchableOpacity activeOpacity={0.6} onPress={leftOnPress} style={styles.backWrapper}>
                        <Image style={ApplicationStyles.headerIcon} source={leftImg} />
                    </TouchableOpacity>
                    : <View style={styles.empty} />
                }

                <Text style={ApplicationStyles.headerTitle}>{title}</Text>

                {rightImg ?
                    <TouchableOpacity activeOpacity={0.6} onPress={rightOnPress} style={styles.backWrapper}>
                        <Image style={ApplicationStyles.headerIcon} source={rightImg} />
                    </TouchableOpacity>
                    : <View style={styles.empty} />
                }
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