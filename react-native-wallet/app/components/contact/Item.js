import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { ApplicationStyles, Images, Colors } from '../../themes'

export default Index = props => {
    const { item, onPress } = props
    return (
        <TouchableOpacity style={styles.wrapper}
            activeOpacity={0.6}
            onPress={onPress}>
            <View style={styles.view}>
                <View style={styles.content}>
                    <Text style={styles.address}>{'6587A4'}</Text>
                    <Text style={styles.note}>{'Dinner at Kao\'s'}</Text>
                </View>
                <Image style={ApplicationStyles.headerIcon} source={Images.button_right} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 20,
    },
    view: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        width: '80%',
    },
    address: {
        color: Colors.darkGray,
        fontSize: 30,
        paddingBottom: 5,
    },
    note: {
        color: Colors.darkGray,
        fontSize: 20,
    },
});