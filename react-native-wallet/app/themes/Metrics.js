import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  screenWidth: width,
  screenHeight: height,
  ovalButtonFontSize: 14,
  ovalButtonDefaultSize: Platform.OS == 'ios' ? width / 3.5 : width / 4,
  ovalButtonSmallSize: Platform.OS == 'ios' ? width / 5 : width / 5.5,
  myAvatrasOverlayMargin: 20,
  headerFontSize: 24,
};

export default metrics;
