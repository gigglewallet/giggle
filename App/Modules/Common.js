import { hex_md5 } from '../Lib/md5'
function toTrunc (value, n) {
  return Math.floor(value * Math.pow(10, n)) / (Math.pow(10, n))
}
export function transferBalance (num) {
  if (!num) return { firstNum: 0, endNum: -1 }
  let sNum = (typeof num === 'number') ? num.toString() : num
  let iNum = (typeof num === 'number') ? num : parseFloat(num)
  let firstNum = toTrunc(iNum, 2).toString()
  let endNum = -1
  if (sNum.length > firstNum.length) endNum = sNum.substring(firstNum.length)
  return { firstNum, endNum }
}

export function getSN () {
  var today = new Date()
  var month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
  var date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
  return hex_md5(`${today.getFullYear()}${month}${date}giggle888`)
}

export const mapRustBalance = (rB) => {
  return {
    amountAwaitingConfirmation: rB.amount_awaiting_confirmation,
    amountAwaitingFinalization: rB.amount_awaiting_finalization,
    amountCurrentlySpendable: rB.amount_currently_spendable,
    amountImmature: rB.amount_immature,
    amountLocked: rB.amount_locked,
    lastConfirmedHeight: rB.last_confirmed_height,
    minimumConfirmations: rB.minimum_confirmations,
    total: rB.total
  }
}
