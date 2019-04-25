import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { ApplicationStyles, Images } from '../../themes'
import Header from '../../components/transactions/Header'
import Content from '../../components/transactions/Content'
import OvalButton from '../../components/shared/OvalButton'

export default class TransactionRequest extends React.Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    confirmDelete = () => {
        Alert.alert(
            'Are you sure you want to delet this request?',
            'You won\'t be able to see this request once cancelled.',
            [
                { text: 'Cancel' }, //, onPress: () => console.log('Ask me later pressed')
                { text: 'OK' },
            ],
            { cancelable: false },
        )
    }

    render() {
        return (
            <View style={ApplicationStyles.screen.safeView}>
                <Header title={'Request'} goBack={this.goBack} />
                <Content outerStyle={styles.content} />

                <View style={styles.statusWrapper}>
                    <OvalButton img={Images.ic_delete}
                        outerStyle={styles.outerStyle}
                        text={`DELETE`}
                        onPress={this.confirmDelete} />
                    <OvalButton img={Images.button_up} text={`PAY`} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 2,
    },
    statusWrapper: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    outerStyle: {
        marginRight: 40,
    },
})