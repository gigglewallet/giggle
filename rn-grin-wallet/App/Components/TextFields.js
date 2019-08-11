import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { TextField } from 'react-native-material-textfield'
import { NumberCircleBtn, NumberCircleBigBtn } from '../Components/Buttons'
import { Phrase } from '../Config/Wordlist_en'
import AutoSuggest from 'react-native-autosuggest'
const MyAvatarsView = styled.TouchableOpacity`
  flex-direction:row
  width:248
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
    <MyAvatarsView>
      <MyAvatarsIcon source={Images.icAvatar} activeOpacity={0.6} />
      <Text style={{ color: Colors.btnColor1, ...Fonts.style.h7, marginLeft: 26 }}>
        {I18n.t('myAvatars')}
      </Text>
    </MyAvatarsView>
  )
}

export const SetWalletPassword = ({ onChangeText, onBlur, refs, error, onFocus, onPress, labelText, value, renderAccessory, onChange, secureTextEntry }) => {
  return (
    <View style={{ borderRadius: 8, backgroundColor: '#2b2b44', marginTop: 24, paddingBottom: 10, paddingLeft: 17, paddingRight: 17 }}>
      <TextField
        label={labelText}
        value={value}
        baseColor='#969696'
        textColor='#fff'
        tintColor='#7878f0'
        errorColor='#f0781e'
        lineWidth={0}
        activeLineWidth={2}
        labelHeight={24}
        onChangeText={onChange}
        onFocus={onFocus}
        renderAccessory={renderAccessory}
        secureTextEntry={secureTextEntry}
        onPress={onPress}
        error={error}
        onBlur={onBlur}
        ref={refs}
        onChangeText={onChangeText}

      />
    </View>
  )
}

const PhraseItemContainer = styled.View`
  justify-content:flex-start
  flex-direction:row
  align-items:center
  height: 36
  margin-left: 16
  margin-top: 4
  
`
/*
const PhraseInputContainer = styled.View`
  width: 108
  height: 32
  border-radius: 6
  border: solid 1px #7878f0
  background-color: #2b2b44
  display: flex
  flex-direction: column
  justify-content: center
`
*/
const PhraseInputContainer = styled.View`
  width: 100
  height: 32
  display: flex
  flex-direction: column  
  justify-content: center
  background-color:red
`

const keys = Phrase.map((item) => item.keyword)

export const PhraseItem = ({ idx, number, setState, phrase }) => {
  let context
  const setSuggest = (c) => {
    context = c
  }
  return (
    <PhraseItemContainer style={{ zIndex: 12 - number }}>
      <NumberCircleBtn w={32} h={32} number={number} />
      <PhraseInputContainer>
        <AutoSuggest
          ref={setSuggest}
          otherTextInputProps={{
            'autoCapitalize': 'none',
            autoCorrect: false,
            onEndEditing: (current) => {
              context.clearTerms()
            }
          }}
          onItemPress={(text) => {
            phrase = text
            setState(idx, text)
          }}
          onChangeText={(text) => {
            phrase = text
            setState(idx, text)
          }}
          terms={(phrase.length >= 3) ? keys : []}
          containerStyles={{
            width: 100,
            height: 32
          }}
          textInputStyles={{
            width: 100,
            height: 32,
            color: '#fff',
            backgroundColor: '#2b2b44',
            borderRadius: 6,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#7878f0'

          }}
          rowWrapperStyles={{
            backgroundColor: '#2b2b44',
            borderColor: '#2b2b44',
            height: 'auto',
            justionContent: 'center',
            alignItems: 'flex-start',
            borderLeftWidth: 1,
            borderLeftColor: '#7878f0',
            borderRightWidth: 1,
            borderRightColor: '#7878f0'

          }}
          rowTextStyles={{
            color: '#fff', ...Fonts.style.h8
          }}
        />
      </PhraseInputContainer>
    </PhraseItemContainer>
  )
}

export const PhraseInput = ({ value }) => {
  return (
    <TextField
      style={{ marginLeft: 8, marginRight: 8, size: 16 }}
      value={value}
      baseColor='#969696'
      textColor='#fff'
      tintColor='#7878f0'
      lineWidth={0}
      activeLineWidth={0}
      labelHeight={14}

    />

  )
}

const PhraseTextContainer = styled.View`
      width: 108
      height: 16
      display: flex
      flex-direction: column
      justify-content: center
    `

export const PhraseItemText = ({ amount, number, text }) => {
  return (
    <PhraseItemContainer>
      <NumberCircleBtn number={number} />
      <PhraseTextContainer>
        <PhraseText value={text} />
      </PhraseTextContainer>
    </PhraseItemContainer>
  )
}

export const PhraseText = ({ value }) => {
  return (
    <Text
      style={{ marginLeft: 8, marginRight: 8, size: 16, color: '#fff' }}

    >{value}</Text>

  )
}

export const VerifyPhraseInput = ({ value }) => {
  return (
    <TextField
      style={{ marginLeft: 8, marginRight: 8, size: 16 }}
      value={value}
      baseColor='#969696'
      textColor='#fff'
      tintColor='#7878f0'
      lineWidth={0}
      activeLineWidth={0}
      labelHeight={22}
      editable={false}

    />

  )
}

const VerifyPhraseItemContainer = styled.View`
      justify-content:flex-start
      flex-direction:row
      align-items:center
      height: 48
      margin-left: 16
      margin-top: 0
      margin-bottom: 24      
    `

const VerifyPhraseInputContainer = styled.View`
      width: 279
      height: 48
      border-radius: 8
      background-color: #2b2b44
      display: flex
      flex-direction: column
      justify-content: center
  border-bottom-width: ${props => props.bottomWidth}
      border-bottom-color: #7878f0
    `

export const VerifyPhraseItem = ({ amount, number, focus, value }) => {
  let width = 0
  let opacity = 0.3

  if (focus) {
    width = 2
    opacity = 1
  }
  return (
    <VerifyPhraseItemContainer>
      <NumberCircleBigBtn w={32} h={32} number={number} opacity={opacity} />
      <VerifyPhraseInputContainer bottomWidth={width}>
        <VerifyPhraseInput value={value} />
      </VerifyPhraseInputContainer>
    </VerifyPhraseItemContainer>
  )
}

export const NormalInput = ({ labelText, value, renderAccessory, onChange, secureTextEntry, maxLength, marginTop, isNumber }) => {
  const mTop = !marginTop ? 0 : marginTop
  const keyboardType = isNumber ? 'numeric' : 'default'
  if (maxLength) {
    return (
      <View style={{ borderRadius: 8, backgroundColor: '#2b2b44', marginTop: mTop, paddingLeft: 17, paddingRight: 17 }}>
        <TextField
          label={labelText}
          value={value}
          baseColor='#969696'
          textColor='#fff'
          tintColor='#7878f0'
          lineWidth={0}
          activeLineWidth={2}
          labelHeight={24}
          maxLength={maxLength}
          onChangeText={onChange}
          renderAccessory={renderAccessory}
          characterRestriction={maxLength}
          secureTextEntry={(!secureTextEntry) ? false : secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    )
  } else {
    return (
      <View style={{ borderRadius: 8, backgroundColor: '#2b2b44', marginTop: mTop, paddingLeft: 17, paddingRight: 17 }}>
        <TextField
          label={labelText}
          value={value}
          baseColor='#969696'
          textColor='#fff'
          tintColor='#7878f0'
          lineWidth={0}
          activeLineWidth={2}
          labelHeight={24}
          onChangeText={onChange}
          renderAccessory={renderAccessory}
          secureTextEntry={(!secureTextEntry) ? false : secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    )
  }
}

export const SearchTextInput = styled.TextInput`
    height:40
    width:100%
    padding-left:15
    padding-right:15
  color: ${Colors.gary}
      `

export const SearchInput = ({ onChange, value, width, placeholder }) => {
  const style = (!width) ? {} : { width: width }
  const p = (!placeholder) ? '' : placeholder
  return (
    <SearchContainer style={style}>
      <SearchIcon source={Images.icSearch} />
      <SearchTextInput
        placeholder={p}
        placeholderTextColor={Colors.darkText}
        onChangeText={onChange}
        value={value}
        style={{ ...Fonts.style.h8 }} />
    </SearchContainer>
  )
}

const SearchIcon = styled.Image`
      width:24
      height:24
      padding-top:5
      padding-bottom:5
      padding-left:3
      padding-right:3
    `
const SearchContainer = styled.View`
  width: ${props => props.width || Metrics.screenWidth - 48}
      height: 48
      padding-left: 12
      padding-right: 12
      flex-direction: row
      justify-content: flex-start
      align-items: center
      border-radius: 8
      background-color: #2b2b44
    `
