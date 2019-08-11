export default {
  getGeneralInfo: () => {
    const info = require('../Fixtures/getGeneralInfo.json')
    return {
      status: true,
      info: info
    }
  },
  getLaunchInfo: () => {
    const info = require('../Fixtures/getLaunchInfo.json')
    return {
      status: true,
      info: info
    }
  }
}
