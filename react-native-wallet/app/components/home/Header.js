import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { ApplicationStyles, Images } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { scrollToTransactionHistory, scrollToContact } = this.props
        return (
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.6}
                    onPress={scrollToTransactionHistory}>
                    <Image style={styles.icon} source={Images.ic_contact} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6}
                    onPress={scrollToContact}>
                    <Image style={styles.icon} source={Images.ic_contact} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        ...ApplicationStyles.navBar,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        ...ApplicationStyles.headerIcon,
    }
});