import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors } from './index'

const ApplicationStyles = {
  screen: {
    safeView: {
      flex: 1,
      backgroundColor: 'white',
    },
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  navBar: {
    width: Metrics.screenWidth,
    height: Platform.OS === 'ios' ? 84 : 50,
    paddingTop: Platform.OS === 'ios' ? 34 : 0,
  },
  headerIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: Metrics.headerFontSize,
    color: Colors.primaryGray,
  }
};

export default ApplicationStyles;
