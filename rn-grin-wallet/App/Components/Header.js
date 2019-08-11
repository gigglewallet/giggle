import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Images, Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { Badge } from '../Components/UI'

const HomeHeaderContainer = styled.View`
    height: 72
    flex-direction:row
    padding-left: 30
    padding-right: 30
    align-items: center
    justify-content: center
`

const HomeHeaderLeftView = styled.TouchableOpacity`
    padding-top: 24
    padding-bottom:24
`
const EmptyHeaderLeftView = styled.View`
    padding-top: 24
    padding-bottom:24
    width:24
    height:24
`
const HomeHeaderRightView = styled.TouchableOpacity`
    padding-top: 24
    padding-bottom:24
`
const HomeHeaderCenterView = styled.View`
  flex:1
  justify-content: center
  align-items:center
`

const HomeHeaderCenterTopView = styled.View`
  flex:3
  justify-content: flex-end
`
const HomeHeaderCenterBottomView = styled.View`
  flex:1
  padding-bottom:20
  flex-direction:row
  align-items: flex-end
`
const HeaderIcon = styled.Image`
  width:24
  height:24
`
const BlackDot = styled.View`
  width:6
  height:6
  opacity: 0.3
  border-radius:6
  background-color:#ffffff
`
const WhiteDot = styled.View`
  width:6
  height:6
  border-radius:6
  background-color:#ffffff
`
const HomeHeaderTitleText = styled.Text`
  font-size:20
  color:#ffffff
`

export const HomeHeader = ({ onPressLeftBtn, onPressRightBtn, count }) => {
  return (
    <HomeHeaderContainer>
      <HomeHeaderLeftView activeOpacity={0.6}
        onPress={onPressLeftBtn}>
        <HeaderIcon source={Images.homeHeaderLeftBtn} />
        {(count === 0) ? null
          : <Badge style={{ top: 38, left: 12 }}>
            {(count >= 10)
              ? <Text style={{ color: Colors.text, ...Fonts.style.tiny }}>{count}</Text>
              : <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>{count}</Text>
            }
          </Badge>}
      </HomeHeaderLeftView>
      <HomeHeaderCenterView>
        <HomeHeaderCenterTopView />
        <HomeHeaderCenterBottomView>
          <BlackDot />
          <WhiteDot style={{ marginRight: 8, marginLeft: 8 }} />
          <BlackDot />
        </HomeHeaderCenterBottomView>
      </HomeHeaderCenterView>
      <HomeHeaderRightView activeOpacity={0.6}
        onPress={onPressRightBtn}>
        <HeaderIcon source={Images.homeHeaderRightBtn} />
      </HomeHeaderRightView>
    </HomeHeaderContainer >
  )
}

HomeHeader.propTypes = {
  onPressLeftBtn: PropTypes.func.isRequired,
  onPressRightBtn: PropTypes.func.isRequired
}

export const TransactionsHeader = ({ onPressRightBtn }) => {
  return (
    <HomeHeaderContainer>
      <EmptyHeaderLeftView />
      <HomeHeaderCenterView>
        <HomeHeaderCenterTopView>
          <Text style={{ color: Colors.text, ...Fonts.style.h5 }} >
            {I18n.t('transactionHeaderTitle')}
          </Text>
        </HomeHeaderCenterTopView>
        <HomeHeaderCenterBottomView>
          <WhiteDot />
          <BlackDot style={{ marginRight: 8, marginLeft: 8 }} />
          <BlackDot />
        </HomeHeaderCenterBottomView>
      </HomeHeaderCenterView>
      <HomeHeaderRightView activeOpacity={0.6}
        onPress={onPressRightBtn}>
        <HeaderIcon source={Images.icBackR} />
      </HomeHeaderRightView>
    </HomeHeaderContainer>
  )
}

TransactionsHeader.propTypes = {
  onPressRightBtn: PropTypes.func.isRequired
}

export const ContactsHeader = ({ onPressLeftBtn, onPressRightBtn }) => {
  return (
    <HomeHeaderContainer>
      <HomeHeaderLeftView activeOpacity={0.6}
        onPress={onPressLeftBtn}>
        <HeaderIcon source={Images.icBackL} />
      </HomeHeaderLeftView>
      <HomeHeaderCenterView>
        <HomeHeaderCenterTopView>
          <Text style={{ color: Colors.text, ...Fonts.style.h5 }} >
            {I18n.t('contractsHeaderTitle')}
          </Text>
        </HomeHeaderCenterTopView>
        <HomeHeaderCenterBottomView>
          <BlackDot />
          <BlackDot style={{ marginRight: 8, marginLeft: 8 }} />
          <WhiteDot />
        </HomeHeaderCenterBottomView>
      </HomeHeaderCenterView>
      <HomeHeaderRightView activeOpacity={0.6}
        onPress={onPressRightBtn}>
        <HeaderIcon source={Images.icAdd} />
      </HomeHeaderRightView>
    </HomeHeaderContainer>
  )
}

export const ContactDetailsHeader = ({ onPressLeftBtn, onPressRightBtn }) => {
  return (
    <HomeHeaderContainer>
      <HomeHeaderLeftView activeOpacity={0.6}
        onPress={onPressLeftBtn}>
        <HeaderIcon source={Images.icBackL} />
      </HomeHeaderLeftView>
      <HomeHeaderCenterView />
      <HomeHeaderRightView activeOpacity={0.6}
        onPress={onPressRightBtn}>
        <HeaderIcon source={Images.icDelete} />
      </HomeHeaderRightView>
    </HomeHeaderContainer>
  )
}

export const CreateNewWalletHeader = ({ onPressLeftBtn, headerText }) => {
  return (
    <HomeHeaderContainer>
      <HomeHeaderLeftView activeOpacity={0.6}
        onPress={onPressLeftBtn}>
        <HeaderIcon source={Images.icBackL} />
      </HomeHeaderLeftView>
      <HomeHeaderCenterView>
        <Text style={{ color: Colors.text, ...Fonts.style.h5 }} >
          {headerText}
        </Text>
      </HomeHeaderCenterView>

    </HomeHeaderContainer>
  )
}

ContactsHeader.propTypes = {
  onPressLeftBtn: PropTypes.func.isRequired,
  onPressRightBtn: PropTypes.func.isRequired
}
