import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Images, Colors } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { onPress, item } = this.props
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.wrapper}>
                <View style={styles.inside}>
                    <View style={styles.content}>
                        <Text style={styles.blackText}>{'6539QW asks for ツ25'}</Text>
                        <Text style={styles.blackText}>{'That cold one buddy.'}</Text>
                        <Text style={styles.time}>{'30 mins ago'}</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image source={Images.ic_dot3} style={styles.icon} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const btnSize = 40
const iconSize = 20
const textPaddingTop = 5
const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryGray,
    },
    inside: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingVertical: textPaddingTop * 2,
    },
    iconWrapper: {
        width: btnSize,
        height: btnSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnSize / 2,
        backgroundColor: Colors.primaryGray,
    },
    icon: {
        width: iconSize,
        height: iconSize,
        resizeMode: 'contain',
    },
    blackText: {
        color: 'black',
        paddingTop: textPaddingTop,
    },
    time: {
        color: Colors.primaryGray,
        paddingTop: textPaddingTop,
    },
});