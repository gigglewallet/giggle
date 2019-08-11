import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor,
    borderBottomWidth: 0,    
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    color: "#fff"
  },
  headerLeft: {
    marginLeft: 24
  },
  headerRight: {
    marginRight: 24
  }
})
