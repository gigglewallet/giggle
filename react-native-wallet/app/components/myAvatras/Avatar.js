import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Images, Metrics } from '../../themes'
import OvalButton from '../shared/OvalButton'

export default class BgHOC extends React.Component {
    render() {
        const { item, onDelete, onCopy, openQRCode } = this.props
        return (
            <View style={styles.wrapper}>
                <Text style={styles.index}>{`AVATAR #${item.index}`}</Text>
                <Text style={styles.address}>{`6587A4`}</Text>
                <View style={styles.btnWrapper}>
                    <OvalButton img={Images.ic_link}
                        text={`Invite${'\n'}Link`}
                        btnSize={Metrics.ovalButtonSmallSize}
                        textStyle={styles.btnTextStyle}
                        onPress={onCopy} />
                    <OvalButton img={Images.ic_qrcode}
                        text={`Address`}
                        btnSize={Metrics.ovalButtonSmallSize}
                        textStyle={styles.btnTextStyle}
                        onPress={openQRCode} />
                    <OvalButton img={Images.ic_delete}
                        text={`Remove${'\n'}Avatar`}
                        btnSize={Metrics.ovalButtonSmallSize}
                        textStyle={styles.btnTextStyle}
                        onPress={onDelete} />
                </View>
            </View>
        )
    }
}

const text = {
    width: '100%',
    color: 'white',
    textAlign: 'center',
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#444444',
        marginBottom: 15,
        padding: 20,
    },
    index: {
        ...text,
        fontSize: 16
    },
    address: {
        ...text,
        fontSize: 50,
        paddingVertical: 10,
    },
    btnWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnTextStyle: {
        fontSize: 16,
        color: 'white',
    }
})