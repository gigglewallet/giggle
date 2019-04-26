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
                        <Text style={styles.blackText}>{'From 6539QW'}</Text>
                        <Text style={styles.blackText}>{'That cold one buddy.'}</Text>
                        <Text style={styles.time}>{'30 mins ago'}</Text>
                    </View>
                    <View style={styles.moneyWrapper}>
                        <Money item={item} />
                        {/* <Text>{`Requeest sent`}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const Money = props => {
    return (
        <View style={styles.moneyView}>
            <Text style={{ color: 'black', fontSize: 24, paddingRight: 10 }}>{`+ツ25`}</Text>
            <Image source={Images.ic_process} style={styles.icon} />
        </View>
    )
}

// const btnSize = 40
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
        flex: 2,
        paddingVertical: textPaddingTop * 2,
    },
    moneyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackText: {
        color: 'black',
        paddingTop: textPaddingTop,
    },
    time: {
        color: Colors.primaryGray,
        paddingTop: textPaddingTop,
    },
    icon: {
        width: iconSize,
        height: iconSize,
        resizeMode: 'contain',
    },
    moneyView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#CCCCCC',
    },
});