import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../themes';

export default class Index extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.box}>
                    <Text style={styles.title}>RECEIVING</Text>
                    <View style={styles.align}>
                        <Text style={styles.mainAmount}>{`ツ3484`}</Text>
                        <Text style={styles.decimalPoint}>{`.83732938`}</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>SENDING</Text>
                    <View style={styles.align}>
                        <Text style={styles.mainAmount}>{`ツ3484`}</Text>
                        <Text style={styles.decimalPoint}>{`.83732938`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#333333',
        flexDirection: 'row',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    align: {
        alignItems: 'flex-end',
    },
    title: {
        color: Colors.primaryGray,
        fontSize: 26,
    },
    mainAmount: {
        paddingTop: 10,
        fontSize: 40,
        color: 'white',
    },
    decimalPoint: {
        fontSize: 20,
        color: 'white',
    },
});