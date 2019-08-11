import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import { AskBtn, SendBtn } from '../Components/Buttons'
import Blockies from 'react-native-blockies'
const StepInfo = styled.Text`
  justify-content:flex-start
  font-family: Play;
  font-size: 14px;
  color: ${props => props.color || '#7878f0'}
  margin-bottom: 8
`

const StepContainer = styled.View`
  display:flex
  flex-direction: row
  justify-content:flex-start
`

const StepItem = styled.View`
  width: ${props => props.width || '90px'}
  height: 4px
  border-radius: 2px
  background-color: ${props => props.color || '#7878f0'}
  margin-right:2
  margin-bottom: 8

`

const StepItemOff = styled.View`
  width: ${props => props.width || '90px'}
  height: 4px;
  border-radius: 2px;
  opacity: 0.3;
  margin-right:2
  background-color:  ${props => props.color || '#7878f0'}
`

export const StepUI = ({ nowStep, totalSteps, color }) => {
  let itemList = []
  for (let i = 0; i < totalSteps; i++) {
    (i < nowStep) ? itemList.push(<StepItem key={i} color={color} />) : itemList.push(<StepItemOff key={i} />)
  }

  return (
    <View>
      <StepInfo color={color}>Step <Text style={{ color: '#fff' }}>{nowStep}</Text> of {totalSteps}</StepInfo>
      <StepContainer color={color}>
        {itemList}
      </StepContainer>
    </View>
  )
}

export const ThreeStepUI = ({ nowStep, totalSteps }) => {
  let itemList = []
  for (let i = 0; i < totalSteps; i++) {
    (i < nowStep) ? itemList.push(<StepItem key={i} width={'60px'} />) : itemList.push(<StepItemOff key={i} width={'60px'} />)
  }

  return (
    <View>
      <StepInfo>Step <Text style={{ color: '#fff' }}>{nowStep}</Text> of {totalSteps}</StepInfo>
      <StepContainer>
        {itemList}
      </StepContainer>
    </View>
  )
}

export const Badge = styled.View`
  width:20
  height: 20
  border-radius:20
  background-color:#f01e78
  justify-content:center
  align-items:center
  position:absolute
 
`
export const RenderContactsItem = ({ item, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <TopItemView >
        <Blockies
          blockies={item.avatarCode} // string content to generate icon
          size={40} // blocky icon size
          style={{ width: 40, height: 40 }} // style of the view will wrap the icon
        />
      </TopItemView >
      <MiddleItemView >
        <MiddleTopItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginLeft: 16 }} >{item.nickname}</Text>
        </MiddleTopItemView>
        <MiddleBottomItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.gary, marginLeft: 16 }} >{item.avatarCode}</Text>
        </MiddleBottomItemView>
      </MiddleItemView >
      <BottomItemView >
        <AskBtn onPress={() => { }} width={64} height={40} />
        <SendBtn onPress={() => { }} width={64} height={40} />
      </BottomItemView >
    </ItemContainer>
  )
}

export const RenderContactsItemNoBtn = ({ item, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <TopItemView >
        <Blockies
          blockies={item.avatarCode} // string content to generate icon
          size={40} // blocky icon size
          style={{ width: 40, height: 40 }} // style of the view will wrap the icon
        />
      </TopItemView >
      <MiddleItemView >
        <MiddleTopItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginLeft: 16 }} >{item.nickname}</Text>
        </MiddleTopItemView>
        <MiddleBottomItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.gary, marginLeft: 16 }} >{item.avatarCode}</Text>
        </MiddleBottomItemView>
      </MiddleItemView >

    </ItemContainer>
  )
}

const MiddleTopItemView = styled.View`
  flex:1
`
const MiddleBottomItemView = styled.View`
  justify-content:flex-start
  flex:1
`

const ItemContainer = styled.TouchableOpacity`
  flex-direction:row
  width: ${Metrics.screenWidth - 48}
  height:71
  padding-top:16
  padding-bottom:16
  border-bottom-color: #343458
  border-bottom-width: 1
`
const TopItemView = styled.View`
  width:20
  justify-content:center
`
const MiddleItemView = styled.View`
  flex:1
  padding-left:16
`
const BottomItemView = styled.View`
  flex-direction:row
`
