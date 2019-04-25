import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import QRCode from '../shared/QRCodeView'
import { Metrics, Images } from '../../themes'
import OvalButton from '../shared/OvalButton'

export default class Index extends React.Component {
    render() {
        const { isShow, value, close, onCopy } = this.props
        return (
            isShow && (
                <View style={styles.wrapper}>
                    <QRCode
                        value={value}
                        size={width}
                        fgColor={'transparent'}
                        bgColor={'white'} />

                    <Text style={styles.title}>{'GRINBOX ADDRESS'}</Text>
                    <Text style={styles.address}>{value}</Text>
                    <View style={styles.btnWrapper}>
                        <OvalButton img={Images.ic_copy}
                            text={`COPY ADDRESS`}
                            textStyle={btnText}
                            onPress={onCopy} />
                        <OvalButton img={Images.button_left}
                            text={`GO BACK`}
                            onPress={close}
                            textStyle={btnText} />
                    </View>
                </View>
            )
        )
    }
}

const width = Metrics.screenWidth * 4 / 5
const textStyle = {
    width: width,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
}
const btnText = {
    color: 'white',
    fontWeight: '700',
}
const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    title: {
        ...textStyle,
        fontSize: 30,
        paddingTop: 20,
    },
    address: {
        ...textStyle,
        fontSize: 20,
        paddingTop: 20,
    },
    btnWrapper: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Metrics.myAvatrasOverlayMargin,
        marginTop: 35,
    },

})