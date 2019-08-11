import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const Container = styled.View`
  width:100%
  height:100%
  justify-content: center
  align-items:center
  z-index:1
  background-color:rgba(255,255,255,0.3)
  position:absolute
`
export const CircularProgress = ({ percentage }) => {
  return (
    <Container>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={percentage}
        tintColor='#00e0ff'
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor='#3d5875' >
        {(fill) => (<Text style={{ color: Colors.text, ...Fonts.style.h2 }}>{percentage}%</Text>)}
      </AnimatedCircularProgress>

    </Container>
  )
}

CircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired
}
