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
