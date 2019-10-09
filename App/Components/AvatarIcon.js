import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import Blockies from 'react-native-blockies'
const Container = styled.View`
  flex-direction:row
  width:auto
  height:32
  border-radius: 36
  paddingLeft:4
  paddingRight:10
  paddingTop:4
  paddingBottom:4
  justify-content: center
  align-items:center
  background-color:#ffffff
`
export const AvatarIcon = ({ avatarCode, name, style }) => {
  return (
    <Container style={style}>
      <Blockies
        blockies={avatarCode} // string content to generate icon
        size={24}
        style={{ width: 24, height: 24 }}
      />
      {(name)
        ? <Text style={{ color: Colors.text2, ...Fonts.style.h8, marginLeft: 4 }}>{name}<Text style={{ color: Colors.text2, ...Fonts.style.h8, marginLeft: 4 }}>・</Text></Text>
        : null}
      {(avatarCode.length < 30)
        ? <Text style={{ color: Colors.text2, ...Fonts.style.h8, marginLeft: 4 }}>{avatarCode}</Text>
        : <Text style={{ color: Colors.text2, ...Fonts.style.tiny, marginLeft: 4 }}>{avatarCode}</Text>
      }
    </Container>
  )
}

AvatarIcon.propTypes = {
  avatarCode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
