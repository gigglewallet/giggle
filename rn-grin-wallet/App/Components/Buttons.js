import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image } from 'react-native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import SwitchToggle from 'react-native-switch-toggle'

const MyAvatarsView = styled.TouchableOpacity`
  flex-direction:row
  width:70%
  height:64
  padding-left:32
  justify-content:flex-start
  align-items:center
  border-radius: 36px;
  background-color: #2b2b44;  
`

const MyAvatarsIcon = styled.Image`
  width:24
  height:24
`
export const MyAvatarsBtn = ({ onPress }) => {
  return (
    <MyAvatarsView onPress={onPress}>
      <MyAvatarsIcon source={Images.icAvatar} activeOpacity={0.6} />
      <Text style={{ color: Colors.btnColor1, ...Fonts.style.h7, marginLeft: 26 }}>
        {I18n.t('myAvatars')}
      </Text>
    </MyAvatarsView>
  )
}

const SettingView = styled.TouchableOpacity`
  width: 64
  height:64
  padding-left:20
  padding-right:20
  padding-top:20
  padding-bottom:20
  justify-content:flex-start
  align-items:center
  border-radius: 36px;
  background-color: #2b2b44;
  margin-left:15
`
const SettingIcon = styled.Image`
  width:24
  height:24
`
export const SettingBtn = ({ onPress }) => {
  return (
    <SettingView onPress={onPress}>
      <SettingIcon source={Images.icSettings} />
    </SettingView>
  )
}

const AskView = styled.TouchableOpacity`
  width: ${props => props.width || '45%'}
  height:${props => props.height || 64}
  justify-content: center
  align-items:center
  border-radius: 36px;
  background-color: rgba(60, 180, 180, 0.1)
  border: solid 1px #3cb4b4
`
export const AskBtn = ({ onPress, width, height }) => {
  return (
    <AskView width={width} height={height} onPress={onPress}>
      <Text style={{ color: Colors.btnColor2, ...Fonts.style.h7 }}>
        {I18n.t('ask')}
      </Text>
    </AskView>
  )
}

const SendView = styled.TouchableOpacity`
  width: ${props => props.width || '45%'}
  height:${props => props.height || 64}
  justify-content: center
  align-items:center
  border-radius: 36px;
  background-color: rgba(240, 30, 120, 0.1);
  border: solid 1px #f01e78
`
export const SendBtn = ({ onPress, width, height }) => {
  return (
    <SendView style={{ marginLeft: 15 }} width={width} height={height} onPress={onPress}>
      <Text style={{ color: Colors.btnColor3, ...Fonts.style.h7 }}>
        {I18n.t('send')}
      </Text>
    </SendView>
  )
}

const DeclineView = styled.TouchableOpacity`
  width: ${props => props.width || 156}
  height:${props => props.height || 64}
  justify-content: center
  align-items:center
  border-radius: 36px;
  border: solid 1px #45457e
`
export const DeclineBtn = ({ onPress, width, height }) => {
  return (
    <DeclineView width={width} height={height} onPress={onPress}>
      <Text style={{ color: Colors.darkText, ...Fonts.style.h7 }}>
        {I18n.t('decline')}
      </Text>
    </DeclineView>
  )
}

const BtnView = styled.TouchableOpacity`        
    margin-top: 24    
    margin-left: 24
    margin-right: 24    
    align-items: center
    justify-content: center
    width: 327px
    height: 64px
    border-radius: 36px
    border: solid 1px #45457e
    background-color: ${props => props.color || '#232332'}
    opacity: ${props => props.opacity || 1}
`

export const LightBtn = ({ onPress, children, disabled }) => {
  return (
    <BtnView color='#7878f0' opacity={(disabled) ? 0.3 : 1} onPress={onPress} disabled={disabled || false}>
      <Text style={{ color: Colors.lightText, ...Fonts.style.button }}>
        {children}
      </Text>
    </BtnView>
  )
}

export const DarkBtn = ({ onPress, children }) => {
  return (
    <BtnView onPress={onPress}>
      <Text style={{ color: Colors.darkText, ...Fonts.style.button }}>
        {children}
      </Text>
    </BtnView>
  )
}

const NextView = styled.TouchableOpacity`
  width: 64
  height: 40
  justify-content: center
  align-items:center
  border-radius: 40px;
  background-color: #7878f0;
  opacity: ${props => props.opacity || 1}
`
export const NextBtn = ({ onPress, children, disabled }) => {
  return (
    <NextView style={{ marginLeft: 15 }} opacity={(disabled) ? 0.3 : 1} onPress={onPress} disabled={disabled || false}>
      <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>
        {children}
      </Text>
    </NextView>
  )
}

export const AddBtn = ({ onPress }) => {
  return (
    <NextView style={{ marginLeft: 15 }} onPress={onPress}>
      <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>
        {I18n.t('add')}
      </Text>
    </NextView>
  )
}

export const VerifyBtn = ({ onPress }) => {
  return (
    <NextView style={{ marginLeft: 15 }} onPress={onPress}>
      <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>
        {I18n.t('verify')}
      </Text>
    </NextView>
  )
}

const ConfirmView = styled.TouchableOpacity`
  width: 80
  height: 40
  justify-content: center
  align-items:center
  border-radius: 40px;
  background-color: #7878f0;
  opacity: ${props => props.opacity || 1}
`

export const ConfirmBtn = ({ onPress, children, disabled }) => {
  return (
    <ConfirmView style={{ marginLeft: 15 }} opacity={(disabled) ? 0.3 : 1} onPress={onPress} disabled={disabled || false}>
      <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>
        {children}
      </Text>
    </ConfirmView>
  )
}

const GreenBall = styled.View`
  width: 8px;
  height: 8px;
  background-color: #3cb43c;
  border-radius: 4px;
`
const YellowBall = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #f0781e;
`
const OnlineStatusView = styled.View`
  flex:1
  justify-content:center
  align-items:center
  flex-direction:row
  height:17
`
export const OnlineStatus = ({ status }) => {
  // status = false
  if (status) {
    return (
      <OnlineStatusView>
        <GreenBall />
        <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginLeft: 4 }}>{I18n.t('online')}</Text>
      </OnlineStatusView>
    )
  } else {
    return (
      <OnlineStatusView>
        <YellowBall />
        <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginLeft: 4 }}>{I18n.t('offline')}</Text>
      </OnlineStatusView>
    )
  }
}

const TouchIDContainer = styled.View`
  flex-direction: row
  align-items:center  
  margin-top:16
`

export const TouchIdSwitchBtn = ({ switchOn, onPress, switchText }) => {
  return (
    <TouchIDContainer>
      <SwitchToggle
        containerStyle={{
          width: 52,
          height: 32,
          borderRadius: 32,
          padding: 6,
          borderColor: '#FFFFFF',
          borderWidth: 2
        }}
        backgroundColorOn='#7878f0'
        backgroundColorOff='#232323'
        circleStyle={{
          width: 26,
          height: 26,
          borderRadius: 27
        }}
        switchOn={switchOn}
        onPress={onPress}
        circleColorOff='#fff'
        circleColorOn='#fff'
        duration={500}
      />
      <Text style={{ color: '#b4b4b4', marginLeft: 16 }}>{switchText}</Text>
    </TouchIDContainer>
  )
}

const NumberCircleIcon = styled.View`
  display:flex
  justify-content:center
  align-items:center
  opacity: ${props => props.opacity || 1}
  width: ${props => props.width || 24}
  height: ${props => props.height || 24}
  margin-right: 8  
`

const NumberCircle = styled.View`
  width: ${props => props.width || 24}
  height: ${props => props.height || 24}
  border-radius:24
  background-color: #7878f0
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
`

export const NumberCircleBtn = ({ number, w, h }) => {
  return (
    <NumberCircleIcon width={w} height={h}>
      <NumberCircle width={w} height={h}>
        <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>{number}</Text>
      </NumberCircle>
    </NumberCircleIcon>
  )
}

export const NumberCircleBigBtn = ({ number, w, h, opacity }) => {
  return (
    <NumberCircleIcon width={w} height={h} opacity={opacity}>
      <NumberCircle width={w} height={h}>
        <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>{number}</Text>
      </NumberCircle>
    </NumberCircleIcon>
  )
}

const WordView = styled.TouchableOpacity`
  align-content:flex-start
  margin-left:8
  border-radius: 6
  border-width: 1
  border-color: #2b2b44
  background-color: #2b2b44
  margin-bottom: 16
`

const WordLabel = styled.View`  
  
  margin-left: 8
  border-radius: 6
  border-width: 1
  border-color: #2b2b44
  background-color: #2b2b44
`
const WordItem = styled.Text` 
  font-size:16  
  padding-left:8
  padding-right:16
  margin-top: 8
  margin-bottom: 8
  color: #fff
`

export const KeywordBtn = ({ children, onPress }) => {
  return (
    <WordView onPress={onPress}>
      <WordLabel>
        <WordItem>{children}</WordItem>
      </WordLabel>
    </WordView>
  )
}
const FullWidthButtonView = styled.TouchableOpacity`
  width: ${Metrics.screenWidth - 48}
  height:64
  justify-content:center
  align-items:center
  border-radius:36
  border: solid 1px #45457e
`

export const FullWidthBtn = ({ children, onPress }) => {
  return (
    <FullWidthButtonView onPress={onPress}>
      <Text style={{ color: Colors.darkText, ...Fonts.style.h7 }}>{children}</Text>
    </FullWidthButtonView>
  )
}

const InviteLinkView = styled.TouchableOpacity`
  width: ${Metrics.screenWidth - 96}
  height: 40
  justify-content:center
  align-items:center
  border-radius: 40
  border: solid 1px #45457e
  margin-bottom: 16
  margin-top: 16
`
export const InviteLinkBtn = ({ text, onPress }) => {
  return (
    <InviteLinkView onPress={onPress}>
      <Text style={{ color: Colors.darkText, ...Fonts.style.h9 }}>{text}</Text>
    </InviteLinkView>
  )
}

const SmallBtnView = styled.TouchableOpacity`
  width: 64
  height: 40
  justify-content: center
  align-items:center
  border-radius: 40px;
  border : solid 1px ${props => props.borderColor || 'transparent'}
  background-color: ${props => props.bgColor || 'transparent'}
`
export const SmallBtn = ({ onPress, borderColor, children, style, fontColor, activeOpacity, bgColor }) => {
  return (
    <SmallBtnView
      style={style}
      bgColor={bgColor}
      borderColor={borderColor}
      onPress={onPress}
      activeOpacity={activeOpacity || 1} >
      <Text style={{ color: fontColor, ...Fonts.style.h8 }}>
        {children}
      </Text>
    </SmallBtnView >
  )
}

const AddToContactsView = styled.TouchableOpacity`
  width: 142
  height: 24
  flex-direction:row
  justify-content:flex-start
  align-items:center
  border-radius: 40
  border: solid 1px #45457e
  paddingLeft:4
  paddingRight:4
`
export const AddToContactsBtn = ({ children, onPress, marginLeft }) => {
  const mLeft = marginLeft || 0
  return (
    <AddToContactsView onPress={onPress} style={{ marginLeft: mLeft }}>
      <Image source={Images.icAdd2} />
      <Text style={{ color: Colors.darkText, ...Fonts.style.h9, marginLeft: 10 }}>{I18n.t('addToContacts')}</Text>
    </AddToContactsView>
  )
}
