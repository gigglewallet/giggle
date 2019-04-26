import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { ApplicationStyles, Images, Colors } from '../../themes'
import { StackActions } from 'react-navigation'
import Header from '../../components/shared/HeaderWithLeftBack'
import OvalButton from '../../components/shared/OvalButton'

export default class ContactEdit extends React.Component {

    state = { note: '' }

    goBack = () => {
        this.props.navigation.goBack()
    }

    handleNoteChange = note => {
        this.setState({ note })
    }

    goBackToContact = () => {
        const { navigation } = this.props
        const contactDetailKey = navigation.getParam('contactDetailKey', null)
        if (contactDetailKey) {
            this.props.navigation.goBack(contactDetailKey)
            return
        }

        this.props.navigation.dispatch(StackActions.pop({
            n: 2,
        })
        );
    }

    render() {
        const { note } = this.state
        return (
            <View style={styles.wrapper}>
                <Header goBack={this.goBack} title={'6587A4'} bgColor={'white'} />
                <Text style={styles.address}>{'6587A4'}</Text>
                <TextInput style={styles.input}
                    placeholder={'Dinner timewith Kao'}
                    placeholderTextColor={Colors.ovalButtonText}
                    value={note}
                    onChangeText={this.handleNoteChange} />
                <OvalButton img={Images.button_right}
                    outerStyle={styles.outerStyle}
                    text={`DONE`}
                    onPress={this.goBackToContact} />
            </View>
        )
    }
}

const top = 40
const styles = StyleSheet.create({
    wrapper: {
        ...ApplicationStyles.screen.safeView,
        backgroundColor: Colors.darkGray,
        alignItems: 'center',
    },
    address: {
        color: 'white',
        fontSize: 30,
        paddingTop: top,
    },
    input: {
        width: '80%',
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        paddingTop: top,
        textAlign: 'center',
    },
    outerStyle: {
        paddingTop: top,
    },
})