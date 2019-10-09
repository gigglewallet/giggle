export const ERROR_TYPE = {
  '1001': { code: '1001', message: 'The wallet name is empty' },
  '1002': {
    code: '1002', message: 'The avatar code or wallet name is empty'
  }

}

export const TRANSACTION_TYPE = {
  Sending: 1,
  SendSuccess: 2,
  SendFail: 3,
  Asking: 4,
  AskSuccess: 5,
  AskFail: 6
}

export const TRANSACTION_METHOD = {
  AVATAR_CODE: 1,
  RELAY_ADDRESS: 2,
  HTTPS: 3
}

export const GRIN_UNIT = 1000000000
