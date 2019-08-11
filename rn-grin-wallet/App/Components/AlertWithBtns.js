import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { View, Text, Keyboard } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../Themes'

export default class AlertWithBtns extends React.Component {

  state = { keyboardShown: false }

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
  keyboardDidShowHandler = () => {
    this.setState({ keyboardShown: true });
  }

  keyboardDidHideHandler = () => {
    this.setState({ keyboardShown: false });
  }

  closeAlert = onPress => () => {
    const { close, input } = this.props
    close()
    if (input) onPress && onPress(this.textinput._lastNativeText)
    else onPress && onPress()
  }

  render() {
    const { keyboardShown } = this.state
    const { isShow, close, title, message, input, buttons } = this.props
    if (!isShow) return null
    const position = keyboardShown ? { justifyContent: 'flex-start', paddingTop: '30%' } : null
    return (
      <View style={[ApplicationStyles.overlay, position]}>
        <IndicatorContainer>
          <Text style={{ ...Fonts.style.h8, color: 'black', padding: 20, textAlign: 'center' }}>{title}</Text>
          {message ? <Text style={{ ...Fonts.style.h9, color: Colors.alertMessage, paddingBottom: 10, marginLeft:15, marginRight:15, marginBottom:15, textAlign:'center'}}>{message}</Text> : null}
          {input ? <TextInput ref={input => this.textinput = input} keyboardType='numeric' /> : null}
          <View style={{ width: '100%', flexDirection: 'row', borderTopColor: Colors.gary2, borderTopWidth: 1 }}>
            {buttons.length < 1 ?
              <Item close={close} button={defaultButton} />
              : buttons.map((b, index) => <Item key={index} onPress={this.closeAlert(b.onPress)} button={b} />)
            }
          </View>
        </IndicatorContainer>
      </View>
    )
  }
}

const defaultButton = {
  text: I18n.t('ok'),
  outerStyle: { width: '100%' }
}

const Item = props => {
  const { button, onPress } = props
  return (
    <ItemWrapper activeOpacity={0.6} onPress={onPress} style={button.outerStyle}>
      <Text style={[{ color: Colors.blue, fontSize: Fonts.size.h8 }, button.style]}>{button.text}</Text>
    </ItemWrapper>
  )
}

const IndicatorContainer = styled.View`
  width: ${Metrics.screenWidth * 4 / 5}
  borderRadius: 5
  justifyContent: center
  alignItems: center
  backgroundColor: rgba(255, 255, 255, 0.8)
  borderRadius: 10
`

const TextInput = styled.TextInput`
  height: 30
  width: 80%
  backgroundColor: white
  borderColor: #4d4d4d
  borderWidth: 0.5
  padding: 3px
  marginBottom: 10
`

const ItemWrapper = styled.TouchableOpacity`
  width: 50%
  justifyContent: center
  alignItems: center
  padding: 15px
`

AlertWithBtns.propTypes = {
  isShow: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  input: PropTypes.bool,
  buttons: PropTypes.array.isRequired,
}