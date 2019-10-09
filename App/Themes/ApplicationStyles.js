import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { StatusBar, Platform, StyleSheet } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const statusBarHeight = (isIphoneX()) ? 44 : 20

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android
const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: (Platform.OS !== 'ios') ? StatusBar.statusBarHeight : statusBarHeight
    },
    mainLeftContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: (Platform.OS !== 'ios') ? StatusBar.statusBarHeight : statusBarHeight
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.windowTint
  },
  alert: {
    buttonRightBorder: {
      borderRightColor: Colors.gary2,
      borderRightWidth: 1
    }
  }
}

export default ApplicationStyles
