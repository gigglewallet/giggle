import React from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { Metrics } from '../../themes'

export default class Index extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.mainAmount}>{`ツ3484`}</Text>
                <Text style={styles.decimalPoint}>{`.83732938`}</Text>
                <Text style={styles.usd}>{`USD 134840.54`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        paddingBottom: Platform.OS == 'ios' ? Metrics.screenHeight / 10 : Metrics.screenHeight / 14,
    },
    mainAmount: {
        paddingTop: 10,
        fontSize: 50,
        color: 'black',
    },
    decimalPoint: {
        fontSize: 28,
        color: 'black',
    },
    usd: {
        fontSize: 20,
        paddingTop: 20,
        color: 'black',
    }
});