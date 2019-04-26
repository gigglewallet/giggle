import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ApplicationStyles, Images, Colors } from '../../themes'
import { CONTACT_EDIT } from '../../constants/routeName'
import Header from '../../components/shared/HeaderWithLeftBack'
import OvalButton from '../../components/shared/OvalButton'

export default class ContactDetail extends React.Component {
    goBack = () => {
        this.props.navigation.goBack()
    }

    goToEdit = () => {
        const { navigation } = this.props
        navigation.navigate(CONTACT_EDIT, { contactDetailKey: navigation.state.key })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Header goBack={this.goBack} title={'6587A4'} bgColor={'white'} />
                <View style={styles.content}>
                    <Text style={styles.address}>{'6587A4'}</Text>
                    <Text style={styles.note}>{'Dinner timewith Kao'}</Text>
                    <Text style={styles.hint}>{'More detail will be added later'}</Text>
                    <OvalButton img={Images.ic_edit} onPress={this.goToEdit} text={`EDIT CONTACT${'\n'}NOTE`} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        ...ApplicationStyles.screen.safeView,
        backgroundColor: Colors.darkGray,
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    address: {
        color: 'white',
        fontSize: 30,
    },
    note: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    hint: {
        color: 'white',
        fontSize: 23,
    },
})