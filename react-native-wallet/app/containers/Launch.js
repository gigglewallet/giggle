import React from 'react'
import { StyleSheet, SafeAreaView, Image, Text } from 'react-native'
import { ApplicationStyles, Images } from '../themes'
import { REDIRECT_TO_HOME } from '../util/navigateActions'
import OvalButton from '../components/shared/OvalButton'

export default class Launch extends React.Component {
    goToHome = () => {
        this.props.navigation.dispatch(REDIRECT_TO_HOME)
    }

    render() {
        return (
            <SafeAreaView style={[ApplicationStyles.screen.safeView, styles.centered]}>
                <Image style={styles.logoIcon} source={Images.launch_logo} />
                <Text>{`A Simple & Private Wallet${'\n'}For The Grin Community`}</Text>
                <Image style={styles.smile} source={Images.launch_smile} />
                <OvalButton img={Images.button_right} text={'GET STARTED'} onPress={this.goToHome} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    logoIcon: {
        height: 140,
        width: 183,
        resizeMode: 'contain',
    },
    smile: {
        height: 41,
        width: 41,
        resizeMode: 'contain',
    }
})