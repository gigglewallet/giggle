import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ApplicationStyles } from '../themes'
import { TRANSACTION_STATUS, TRANSACTION_REQUEST } from '../constants/routeName'
import Header from '../components/transactions/Header'
import Amount from '../components/transactions/Amount'
import SearchInput from '../components/shared/SearchInput'
import RequestList from '../components/transactions/RequestList'
import TransactionList from '../components/transactions/TransactionList'

export default class TransactionHistory extends React.Component {

    onItemClick = index => () => {
        //TODO from demo
        if (index % 2 === 0)
            this.props.navigation.navigate(TRANSACTION_STATUS)
        else
            this.props.navigation.navigate(TRANSACTION_REQUEST)
    }

    render() {
        const { scrollToHome } = this.props
        return (
            <View style={ApplicationStyles.screen.safeView}>
                <Header title={'Transactions'} goBack={scrollToHome} setting />
                <Amount />
                <SearchInput
                // onSubmitEditing={this.doSearch}
                />
                <ScrollView style={styles.scroll}>
                    <RequestList onItemClick={this.onItemClick} />
                    <TransactionList />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    }
})