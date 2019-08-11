import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 100
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },
  logo: {
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centered: {
    alignItems: 'center'
  },
  darkText: {
    fontFamily: 'Play',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#7878f0'
  },
  lightText: {
    fontFamily: 'Play',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#ffffff'
  }
})
