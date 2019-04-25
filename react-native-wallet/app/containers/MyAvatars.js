import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { ApplicationStyles, Images, Metrics } from '../themes'
import { COPIED_SHOW_TIEM } from '../constants/times'
import BgHoc from '../components/myAvatras/BgHOC'
import AvatarList from '../components/myAvatras/AvatarList'
import OvalButton from '../components/shared/OvalButton'
import CopiedView from '../components/myAvatras/CopiedView'
import QRCodeAddress from '../components/myAvatras/QRCodeAddress'

export default class Launch extends React.Component {

    state = { isShowCopiedView: false, isShowQRCodeView: false }

    componentWillUnmount() {
        clearTimeout(this.timer && this.timer)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    confirmDelete = () => {
        Alert.alert(
            'Are you sure you want to remove this avatar?',
            `Removing this avatar won\'t affect your balance, however, no one will be able to find you, send or receive Grin with this avatar.${'\n'}Previous transactions related to this avatar will be deleted as well.`,
            [
                { text: 'Cancel' }, //, onPress: () => console.log('Ask me later pressed')
                { text: 'OK' },
            ],
            { cancelable: false },
        )
    }

    copy = () => {
        this.setState({ isShowCopiedView: true })
        this.timer = setTimeout(() => this.setState({ isShowCopiedView: false }), COPIED_SHOW_TIEM)
    }

    setIsShowQRCodeView = isShowQRCodeView => e => {
        this.setState({ isShowQRCodeView })
    }

    render() {
        const { isShowCopiedView, isShowQRCodeView } = this.state
        return (
            <View style={[ApplicationStyles.screen.safeView, styles.wrapper]}>
                <BgHoc goBack={this.goBack}>
                    <Text style={styles.logo}>{`ツ`}</Text>
                    <Text style={styles.word}>{`Avatars are your temporary usernames for people to find you, have as many as you want, delete them at anytime, it wouldn’t affect your balance.`}</Text>

                    <AvatarList onDelete={this.confirmDelete} onCopy={this.copy} openQRCode={this.setIsShowQRCodeView(true)} />

                    <View style={styles.btnWrapper}>
                        <OvalButton img={Images.ic_add} text={`CUSTOMIZE AN${'\n'}AVATAR NAME`} />
                        <OvalButton img={Images.ic_random} text={`GENERATE A${'\n'}RANDOM AVATAR`} />
                    </View>
                </BgHoc>
                <QRCodeAddress
                    isShow={isShowQRCodeView}
                    value={'furieow2134jklfdsjfe63723jej4h32jfjds2j4kl;23'}
                    close={this.setIsShowQRCodeView(false)}
                    onCopy={this.copy} />
                <CopiedView isShow={isShowCopiedView} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 60,
        width: '100%',
        textAlign: 'center',
        color: 'black',
    },
    word: {
        width: '100%',
        textAlign: 'center',
        color: 'black',
        padding: 20,
    },
    btnWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: Metrics.myAvatrasOverlayMargin,
        marginVertical: 20,
    },
})