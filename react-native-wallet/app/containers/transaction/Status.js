import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { ApplicationStyles, Images } from '../../themes'
import Header from '../../components/transactions/Header'
import Content from '../../components/transactions/Content'

export default class TransactionStatus extends React.Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={ApplicationStyles.screen.safeView}>
                <Header title={'Transaction'} goBack={this.goBack} />
                <Content outerStyle={styles.content} />

                <View style={styles.statusWrapper}>
                    <Image style={styles.icon} source={Images.ic_process} />
                    <Text style={styles.statusText}>{`Processing`}</Text>
                </View>
            </View>
        )
    }
}

const iconSize = 40
const styles = StyleSheet.create({
    content: {
        flex: 2,
    },
    statusWrapper: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    statusText: {
        fontSize: 30,
        color: 'black',
        paddingLeft: 20,
    },
    icon: {
        height: iconSize,
        width: iconSize,
        resizeMode: 'contain',
    }
})