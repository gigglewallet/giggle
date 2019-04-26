import React from 'react'
import { StyleSheet, View, Text, Animated, TextInput } from 'react-native'
import { ApplicationStyles, Images, Colors, Metrics } from '../themes'
import Header from '../components/shared/Header'
import OvalButton from '../components/shared/OvalButton'
import OvalHollowButton from '../components/shared/OvalHollowButton'

const STEPS = { inputAmount: 0, inputNote: 1, send: 2 }
export default class AskAmount extends React.Component {

    state = { step: 0, amount: 'ツ0', note: '', fly: new Animated.Value(0) }

    goBack = () => {
        this.props.navigation.goBack()
    }

    handleAmountChange = amount => {
        if (amount.length === 0) {
            this.setState({ amount: 'ツ' })
            return
        }

        const data = amount.replace('ツ', '')
        if (!isNaN(Number(data)))
            this.setState({ amount })
    }

    handleNoteChange = note => {
        this.setState({ note })
    }

    goToStep = step => () => {
        this.setState({ step })

        if (step === STEPS.done) {
            this.flyAway()
        }
    }

    flyAway = () => {
        Animated.timing(
            this.state.fly,
            {
                toValue: -Metrics.screenHeight,
                duration: 1500,
            },
        ).start();
    }


    render() {
        const { amount, note, step, fly } = this.state
        const hideNoteInput = step === STEPS.inputAmount
        const noteStyle = hideNoteInput ? { width: 0 } : { width: '80%' }
        return (
            <View style={styles.wrapper}>
                <Header leftImg={Images.button_left_white} leftOnPress={this.goBack} />
                <Animated.View
                    style={[styles.content, { top: fly }]}
                // style={{ ...styles.wrapper, opacity: this.state.fade }} 
                >
                    <Text style={styles.title}>{'ASKING'}</Text>
                    <Text style={styles.title}>{'6587A4 FOR'}</Text>
                    <TextInput style={styles.amountInput}
                        keyboardType={'numeric'}
                        placeholderTextColor={Colors.ovalButtonText}
                        value={amount}
                        onChangeText={this.handleAmountChange}
                        editable={step === STEPS.inputAmount} />
                    <TextInput style={[styles.noteInput, noteStyle]}
                        placeholder={'What\'s it for?'}
                        placeholderTextColor={Colors.ovalButtonText}
                        value={note}
                        onChangeText={this.handleNoteChange}
                        editable={!hideNoteInput} />
                </Animated.View>

                {step === STEPS.inputAmount &&
                    <OvalButton img={Images.button_right}
                        onPress={this.goToStep(STEPS.inputNote)}
                        text={`NEXT`} />
                }
                {step === STEPS.inputNote &&
                    <OvalButton img={Images.button_up}
                        onPress={this.goToStep(STEPS.done)}
                        text={`SEND REQUEST`} />
                }
                {step === STEPS.done &&
                    <OvalHollowButton
                        img={Images.ic_v_white}
                        onPress={this.goBack}
                        text={`REQUEST SEND`} />
                }
            </View>
        )
    }
}

const inputStyle = {
    color: 'white',
    width: '80%',
    textAlign: 'center',
    padding: 5,
}
const styles = StyleSheet.create({
    wrapper: {
        ...ApplicationStyles.screen.safeView,
        backgroundColor: Colors.darkGray,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        color: Colors.ovalButtonText,
        fontSize: 24,
        paddingTop: 5,
    },
    amountInput: {
        ...inputStyle,
        fontSize: 50,
        paddingTop: 40,
    },
    noteInput: {
        ...inputStyle,
        fontSize: 24,
        paddingVertical: 25,
    },

})