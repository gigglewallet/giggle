import React from 'react'
import { StyleSheet, View, Image, TextInput } from 'react-native'
import { Images, Metrics, Colors } from '../../themes'

const Index = props => {
    return (
        <View style={styles.wrapper}>
            <Image style={styles.icon} source={Images.ic_search} />
            <TextInput
                style={styles.input}
                placeholderTextColor={'gray'}
                returnKeyType={'search'}
                {...props}
            />
        </View >
    )
}

export default Index

const iconSize = Metrics.screenWidth / 20
const styles = StyleSheet.create({
    wrapper: {
        width: Metrics.screenWidth,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryGray,
        justifyContent: 'center',
        paddingVertical: 10,
    },
    icon: {
        position: 'absolute',
        left: iconSize,
        width: iconSize,
        height: iconSize,
        resizeMode: 'contain',
    },
    input: {
        flex: 1,
        color: 'black',
        paddingLeft: iconSize * 3,
        paddingRight: iconSize,
    },
})