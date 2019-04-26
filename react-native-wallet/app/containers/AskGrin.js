import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ApplicationStyles } from '../themes'
import { ASK_AMOUNT, NEW_RECIPIENT } from '../constants/routeName'
import Header from '../components/shared/HeaderWithLeftBack'
import NewRecipient from '../components/shared/NewRecipient'
import SearchInput from '../components/shared/SearchInput'
import ContactItem from '../components/contact/Item'

const array = [{ "id": "WK-001" }, { "id": "WK-002" }, { "id": "WK-003" }, { "id": "WK-004" }, { "id": "WK-3" }, { "id": "WK-4" }, { "id": "WK-5" }, { "id": "WK-6" }, { "id": "WK-7" }, { "id": "WK-8" }, { "id": "WK-9" }, { "id": "WK-10" }]
export default class AskGrin extends React.Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    goTo = page => () => {
        this.props.navigation.navigate(page)
    }

    render() {
        return (
            <View style={ApplicationStyles.screen.safeView}>
                <Header goBack={this.goBack} title={'ASK GRIN FROM'} />
                <NewRecipient onPress={this.goTo(NEW_RECIPIENT)} />
                <SearchInput />

                <FlatList
                    style={styles.flatlist}
                    data={array}
                    keyExtractor={(item, index) => '' + index}
                    renderItem={({ item }) =>
                        <ContactItem item={item} onPress={this.goTo(ASK_AMOUNT)} />
                    } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        marginBottom: 40,
    },
})