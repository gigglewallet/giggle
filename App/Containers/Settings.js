import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { DarkBtn } from '../Components/Buttons'
import { ApplicationStyles, Metrics, Images, Fonts, Colors } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import AlertWithBtns from '../Components/AlertWithBtns'

const TempData = [
  { text: I18n.t('transactionFees'), value: 'ツ0.008' },
  { text: I18n.t('node'), value: '123.456.789.8080' }
]

export default class Settings extends Component {
  state = { alertShow: false, alertTitle: '', alertMessage: '', alertBtns: [], alertInput: false }

  onItemClick = index => () => {
    switch (index) {
      case -1:
        // logout
        this.setState({
          alertShow: true,
          alertTitle: I18n.t('logoutAlertMessage'),
          alertMessage: '',
          alertBtns: [
            { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
            { text: I18n.t('btn_logout'), style: { color: 'red' }, onPress: this.logout }
          ],
          alertInput: false
        })
        break

      case 0:
        this.setState({
          alertShow: true,
          alertTitle: I18n.t('transactionFees'),
          alertMessage: '',
          alertBtns: [
            { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
            { text: I18n.t('ok'), onPress: (f) => this.changeTransactionFee(f) }
          ],
          alertInput: true
        })
        break

      case 1:
        this.setState({
          alertShow: true,
          alertTitle: I18n.t('node'),
          alertMessage: '',
          alertBtns: [
            { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
            { text: I18n.t('ok'), onPress: (n) => this.changeNode(n) }
          ],
          alertInput: true
        })
        break

      default:
        break
    }
  }

  closeAlert = () => {
    this.setState({
      alertShow: false,
      alertTitle: '',
      alertMessage: '',
      alertBtns: [],
      alertInput: false
    })
  }

  logout = () => {
    console.log('Do Logout~~')
  }

  changeTransactionFee = fees => {
    console.log(`Change Transaction Fees To ${fees}`)
  }

  changeNode = node => {
    console.log(`Change Node To ${node}`)
  }

  render () {
    const { alertShow, alertTitle, alertMessage, alertBtns, alertInput } = this.state
    return (
      <View style={ApplicationStyles.screen.mainContainer} >
        <View style={{
          alignItems: 'center',
          flex: 1,
          paddingBottom: 24
        }}>
          {TempData.map((i, index) => <Item key={`${index}`} item={i} onPress={this.onItemClick(index)} />)}
        </View>

        <BottomContainer>
          <DarkBtn onPress={this.onItemClick(-1)}>
            {I18n.t('btn_logout')}
          </DarkBtn>
        </BottomContainer>

        <AlertWithBtns isShow={alertShow}
          close={this.closeAlert}
          title={alertTitle}
          message={alertMessage}
          buttons={alertBtns}
          input={alertInput} />
      </View>
    )
  }
}

const Item = props => {
  const { item, onPress } = props

  return (
    <ItemContainer onPress={onPress}>
      <Text style={{ ...Fonts.style.h7, color: Colors.snow }}>{item.text}</Text>
      <ItemValueContainer>
        <Text style={{ ...Fonts.style.h7, color: Colors.gary2 }}>
          {item.value}
        </Text>
      </ItemValueContainer>
      <ItemIcon source={Images.icBackR} />
    </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row
  width: ${Metrics.screenWidth - 48}
  align-items: center
  align-content: center
  padding-vertical: 20
  borderBottomColor: #343458
  borderBottomWidth: 1
`

const ItemValueContainer = styled.View`  
  flex-direction: row
  flex: 1
  align-items: center  
  justify-content: flex-end
  margin-right: 10
`

const ItemIcon = styled.Image`
  width:20
  height:20
`

const BottomContainer = styled.View`
  height: 120
  align-items: flex-end
`
