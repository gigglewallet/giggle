import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Index extends React.Component {
    render() {
        const { outerStyle } = this.props
        return (
            <View style={[styles.wrapper, outerStyle]}>
                <Text style={styles.smallText}>From</Text>
                <Text style={styles.bigText}>{`6539QW`}</Text>
                <Text style={styles.smallText}>For</Text>
                <Text style={styles.bigText}>{`-ツ25`}</Text>
                <Text style={styles.smallText}>Because</Text>
                <Text style={styles.middleText}>{`The cold one buddy!`}</Text>
                <Text style={styles.smallText}>Sent</Text>
                <Text style={styles.middleText}>{`30 minutes ago`}</Text>
            </View>
        )
    }
}

const small = 20
const middle = 28
const big = 35
const text = {
    paddingTop: 20,
    color: 'black',
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
    },
    smallText: {
        ...text,
        fontSize: small,
    },
    middleText: {
        ...text,
        fontSize: middle,
    },
    bigText: {
        ...text,
        fontSize: big,
    },
});