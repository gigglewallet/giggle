import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ContactActions } from '../actions'
import { ApplicationStyles } from '../themes'
import { CONTACT_DETAIL, NEW_RECIPIENT } from '../constants/routeName'
import Header from '../components/shared/HeaderWithLeftBack'
import NewRecipient from '../components/shared/NewRecipient'
import SearchInput from '../components/shared/SearchInput'
import ContactItem from '../components/contact/Item'

const array = [{ "id": "WK-001" }, { "id": "WK-002" }, { "id": "WK-003" }, { "id": "WK-004" }, { "id": "WK-3" }, { "id": "WK-4" }, { "id": "WK-5" }, { "id": "WK-6" }, { "id": "WK-7" }, { "id": "WK-8" }, { "id": "WK-9" }, { "id": "WK-10" }]
class Contact extends React.Component {

    goTo = page => () => {
        this.props.navigation.navigate(page)
    }

    render() {

        const { scrollToHome } = this.props
        return (
            <View style={ApplicationStyles.screen.safeView}>
                <Header goBack={scrollToHome} title={'CONTACTS'} />
                <NewRecipient onPress={this.goTo(NEW_RECIPIENT)} />
                <SearchInput />

                <FlatList
                    style={styles.flatlist}
                    data={array}
                    keyExtractor={(item, index) => '' + index}
                    renderItem={({ item }) =>
                        <ContactItem item={item} onPress={this.goTo(CONTACT_DETAIL)} />
                    } />
            </View>
        )
    }
}

export default connect(
    state => ({
        contact: state.contact,
    }),
    {
        contactTest: ContactActions.contactTest,
    }
)(Contact)

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        marginBottom: 40,
    },
})