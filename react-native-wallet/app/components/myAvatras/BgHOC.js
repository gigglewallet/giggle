import React from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Images, Metrics } from '../../themes'

export default class BgHOC extends React.Component {
    render() {
        const { children, goBack } = this.props
        return (
            <SafeAreaView style={ApplicationStyles.overlay}>
                <View style={styles.whiteBg}>
                    <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
                        <View style={styles.cancelWrapper}>
                            <Image style={styles.cancel} source={Images.ic_cancel} />
                        </View>
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollView}>
                        {children}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const cancelSize = 20
const styles = StyleSheet.create({
    whiteBg: {
        flex: 1,
        margin: Metrics.myAvatrasOverlayMargin,
        marginBottom: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'white',
    },
    cancelWrapper: {
        width: '100%',
        padding: 20,
        paddingBottom: 10,
        alignItems: 'flex-end',
    },
    cancel: {
        height: cancelSize,
        width: cancelSize,
        resizeMode: 'contain',
    },
    scrollView: {
        flex: 1
    },
})