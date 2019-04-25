import React from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Images } from '../themes'
import Header from '../components/shared/HeaderWithLeftBack'
import OvalButton from '../components/shared/OvalButton'

const DEFAULT_HEIGHT = 34
const STEPS = { inputAvatar: 0, inputNote: 1, goBack: 2 }
export default class NewRecipient extends React.Component {
    state = {
        KeyboardShown: false,
        step: STEPS.inputAvatar,
        avatarCode: '',
        notice: '',
        note: '',
        keyboardHeight: DEFAULT_HEIGHT,
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler);

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardDidHideHandler);
    }

    componentWillUnmount() {
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    keyboardDidShowHandler = event => {
        this.setState({ KeyboardShown: true, keyboardHeight: event.endCoordinates.height });
    }

    keyboardDidHideHandler = () => {
        this.setState({ KeyboardShown: false, keyboardHeight: DEFAULT_HEIGHT });
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    goToStep = step => () => {
        this.setState({ step })
    }

    updateAvatar = (avatarCode) => {
        this.setState({ avatarCode: avatarCode, notice: '' })
        if (avatarCode.length === 6) {
            this.setState({ notice: 'this user does not exist' })
        }
    }

    updateNote = note => {
        this.setState({ note: note })
    }

    render() {
        const { step, avatarCode, notice, keyboardHeight } = this.state
        const titleView = { paddingVertical: this.state.KeyboardShown ? 25 : 50 }
        const buttonView = { paddingTop: 20 }
        const avoidKeyboard = { bottom: keyboardHeight }
        return (
            <View style={styles.screen}>
                <Header goBack={this.goBack} title={'NEW RECIPIENT'} bgColor='white' />
                {step === STEPS.inputAvatar &&
                    <View style={styles.stepView}>
                        <Text style={[styles.titleText, titleView]}>{'Enter avatar code'}</Text>
                        <TextInput style={styles.textInputView}
                            maxLength={6}
                            onChangeText={this.updateAvatar} />
                        <Text style={styles.noticeText}>{notice}</Text>
                        <OvalButton img={Images.button_right} outerStyle={buttonView} text={'NEXT'}
                            onPress={this.goToStep(STEPS.inputNote)} />
                    </View>
                }
                {step === STEPS.inputNote &&
                    <View style={styles.stepView}>
                        <Text style={[styles.titleText, titleView, styles.avatarText]}>{avatarCode}</Text>
                        <TextInput style={styles.textInputView}
                            placeholder={'Add a note about ' + avatarCode}
                            placeholderTextColor={translucentWhite}
                            onChangeText={this.updateNote} />
                        <Text style={styles.noticeText} />
                        <OvalButton img={Images.button_right} outerStyle={buttonView} text={'NEXT'}
                            onPress={this.goBack} />
                    </View>
                }
                {step === STEPS.goBack &&
                    <View style={styles.stepView}>
                        <Text style={[styles.titleText, styles.comingText]}>{'COMING\nSOON'}</Text>
                        <OvalButton img={Images.button_left} outerStyle={buttonView} text={'GO BACK'}
                            onPress={this.goToStep(STEPS.inputAvatar)} />
                    </View>
                }
                {step === STEPS.inputAvatar &&
                    <TouchableOpacity style={[styles.insteadView, avoidKeyboard]}
                        onPress={this.goToStep(STEPS.goBack)}>
                        <Text style={styles.insteadText}>{`Use Grinbox address${'\n'}or file transfers instead`}</Text>
                        <Image style={styles.imgRight} source={Images.button_right} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const translucentWhite = 'rgba(255,255,255,0.5)'
const styles = StyleSheet.create({
    screen: {
        ...ApplicationStyles.screen.safeView,
        alignItems: 'center',
        backgroundColor: '#363637',
    },
    stepView: {
        width: '100%',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    avatarText: {
        fontSize: 30,
    },
    textInputView: {
        width: '80%',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 5,
        borderBottomColor: translucentWhite,
        borderBottomWidth: 1,
        letterSpacing: 20,
    },
    insteadView: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: translucentWhite,
        paddingVertical: 5,
    },
    insteadText: {
        color: 'black',
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    imgRight: {
        position: 'absolute',
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10,
    },
    noticeText: {
        height: 70,
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 20,
    },
    comingText: {
        paddingVertical: 150,
        fontSize: 50,
    }
})