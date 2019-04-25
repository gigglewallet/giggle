import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ApplicationStyles, Images, Colors, Metrics } from '../themes'
import * as RouteNames from '../constants/routeName'
import Header from '../components/home/Header'
import Amount from '../components/home/Amount'
import OvalButton from '../components/shared/OvalButton'

export default class Home extends React.Component {

    goToSpecificRoute = routeName => e => {
        this.props.navigation.navigate(routeName)
    }

    render() {
        const { scrollToTransactionHistory, scrollToContact } = this.props
        return (
            <View style={[ApplicationStyles.screen.safeView, styles.wrapper]}>
                <Header
                    scrollToTransactionHistory={scrollToTransactionHistory}
                    scrollToContact={scrollToContact} />
                <Text style={styles.hint}>{'GRIN BALANCE'}</Text>
                <Text style={styles.hint}>{'ONLINE'}</Text>
                <Amount />
                <OvalButton img={Images.launch_logo}
                    topText={'MY AVATARS'}
                    onPress={this.goToSpecificRoute(RouteNames.MYAVATRAS)} />
                <View style={styles.btnWrapper}>
                    <OvalButton img={Images.button_down}
                        outerStyle={styles.outerStyle}
                        text={'ASK'}
                        onPress={this.goToSpecificRoute(RouteNames.ASK_GRIN)} />
                    <OvalButton img={Images.button_up} text={'SEND'}
                        onPress={this.goToSpecificRoute(RouteNames.SEND_GRIN)} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    hint: {
        color: Colors.ovalButtonText,
        paddingTop: 15,
    },
    btnWrapper: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    outerStyle: {
        marginRight: 40,
    }
    // logoIcon: {
    //     height: 140,
    //     width: 183,
    //     resizeMode: 'contain',
    // },
    // smile: {
    //     height: 41,
    //     width: 41,
    //     resizeMode: 'contain',
    // }
})