const type = {
  base: 'Play',
  bold: 'Play',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h0: 40,
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h4_2: 24,
  h5: 20,
  h6: 19,
  h7: 18,
  h8: 16,
  h9: 14,
  input: 18,
  button: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 7.5,
  avatarCode: 32
}

const style = {
  h0: {
    fontFamily: type.base,
    fontSize: size.h0
  },
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h4_2: {
    fontFamily: type.base,
    fontSize: size.h4_2
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  h7: {
    fontFamily: type.base,
    fontSize: size.h7
  },
  h8: {
    fontFamily: type.base,
    fontSize: size.h8
  },
  h9: {
    fontFamily: type.base,
    fontSize: size.h9
  },
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  button: {
    fontFamily: type.base,
    fontSize: size.button
  },
  wallerCreate: {
    fontFamily: type.base,
    fontSize: size.h5

  },
  avatarCode: {
    fontFamily: type.base,
    fontSize: size.avatarCode
  }
}

export default {
  type,
  size,
  style
}
