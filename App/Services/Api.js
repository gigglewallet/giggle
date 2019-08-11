// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { getSN, getDeviceId } from '../Modules/Common'
console.log('getSN = ' + getSN())
console.log('getDeviceId=' + getDeviceId())
const create = (baseURL = 'http://giggle-test.ddns.net/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getGeneralInfo = () => api.get('general_info', { sn: getSN() })
  const getLaunchInfo = () => api.get('launch_info', { sn: getSN() })

  const createAvatar = (isRandom, avatarCode) =>
    (isRandom ? api.get('create_avatar', { method: 'random', sn: getSN() }) : api.get('create_avatar', { method: 'customize', sn: getSN(), avatar_code: avatarCode }))

  const deleteAvatar = (avatarCode) => api.get('delete_avatar', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode })
  const getAllAvatars = () => api.get('list_avatars', { sn: getSN(), unique_id: getDeviceId() })

  const getSettings = () => api.get('get_settings', { sn: getSN(), unique_id: getDeviceId() })
  const updateSettings = (nodeIp, nodePort, transactionFee) => api.get('update_settings', { sn: getSN(), unique_id: getDeviceId(), node_ip: nodeIp, node_port: nodePort, transaction_fee: transactionFee })

  // Contaact
  const getContacts = () => api.get('get_contacts', { sn: getSN(), unique_id: getDeviceId() })
  const addContact = (avatarCode, note) => api.get('add_contact', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode, note })
  const deleteContact = (avatarCode) => api.get('delete_contact', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode })
  const getContactDatail = (avatarCode) => api.get('contact_detail', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode })
  const updateContactNote = (avatarCode, note) => api.get('edit_contact_note', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode, note: note })

  // Transaction
  const getAllTransactions = () => api.get('list_all_transactions', { sn: getSN(), unique_id: getDeviceId() })
  const getTransactionDetail = () => api.get('transaction_detail', { sn: getSN(), unique_id: getDeviceId() })

  // Wallet
  const getBalance = () => api.get('get_balance', { sn: getSN(), unique_id: getDeviceId() })
  const send = (avatarCode, amount) => api.get('send', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode, amount: amount })
  const ask = (avatarCode, amount) => api.get('send', { sn: getSN(), unique_id: getDeviceId(), avatar_code: avatarCode, amount: amount })

  return {
    getGeneralInfo,
    getLaunchInfo,
    createAvatar,
    deleteAvatar,
    getAllAvatars,
    getSettings,
    updateSettings,
    getContacts,
    addContact,
    deleteContact,
    getContactDatail,
    updateContactNote,
    getAllTransactions,
    getTransactionDetail,
    getBalance,
    send,
    ask
  }
}

// let's return back our create method as the default.
export default {
  create
}
