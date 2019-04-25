import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Metrics, Colors } from '../../themes'
import Transaction from './Transaction'

const array = [{ "id": "WK-001" }, { "id": "WK-002" }, { "id": "WK-003" }, { "id": "WK-004" }, { "id": "WK-3" }, { "id": "WK-4" }, { "id": "WK-5" }, { "id": "WK-6" }, { "id": "WK-7" }, { "id": "WK-8" }, { "id": "WK-9" }, { "id": "WK-10" }]
export default class TransactionList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) {
            return true
        }
        return false
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.text}>{'Current Requests'}</Text>
                {
                    array.map((item, index) => <Transaction key={`t_${index}`} item={item} />)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: Metrics.screenWidth,
        padding: 10,
        alignItems: 'center',
    },
    text: {
        padding: 5,
        color: Colors.primaryGray,
    },
    flatlist: {
        width: '100%',
    },
})