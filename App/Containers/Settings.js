import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { DarkBtn } from '../Components/Buttons'
import { ApplicationStyles, Metrics, Images, Fonts, Colors } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import AlertWithBtns from '../Components/AlertWithBtns'
import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import GeneralActions from '../Redux/GeneralRedux'
import moment from 'moment'
const TempData = [
  // { text: I18n.t('transactionFees'), value: 'ツ0.008' },
  // { text: I18n.t('node'), value: '123.456.789.8080' }
]

class Settings extends Component {
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
    // remove all wallet
    const { logout } = this.props

    logout()
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
          <FlatList
            data={this.props.errorList}
            renderItem={({ item }) => <RenderItem item={item} />}
          />
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

const RenderItem = ({ item }) => {
  return (
    <ErrorItemContainer >
      <Text style={{ color: 'white' }}>action:{item.action}</Text>
      <Text style={{ color: 'white' }}>message:{item.message}</Text>
      <Text style={{ color: 'white' }}>time:{item.time ? moment(item.time).fromNow() : null}</Text>
    </ErrorItemContainer>
  )
}
const ErrorItemContainer = styled.View`
  flex-direction:column
  width: ${Metrics.screenWidth - 48}
  padding-top:16
  padding-bottom:16
  border-bottom-color: #343458
  border-bottom-width: 1
`
const mapStateToProps = (state) => {
  return {
    wallets: state.giggle.wallets,
    currentWallet: state.giggle.currentWallet,
    errorList: state.giggle.errorList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(GiggleActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

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
