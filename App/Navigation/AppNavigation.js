import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import SwiperHome from '../Containers/SwiperHome'
import SignUp from '../Containers/SignUp'
import CreateNewWallet from '../Containers/CreateNewWallet'
import SetWalletPassword from '../Containers/SetWalletPassword'
import ResetWalletPassword from '../Containers/ResetWalletPassword'
import SetSpendingPin from '../Containers/SetSpendingPin'
import ResetSpendingPin from '../Containers/ResetSpendingPin'
import SignUpComplete from '../Containers/SignUpComplete'
import Restore from '../Containers/Restore'
import BackUpReminder from '../Containers/BackUpReminder'
import BackUpRecoveryPhrase from '../Containers/BackUpRecoveryPhrase'
import BackUpVerifyRecoveryPhrase from '../Containers/BackUpVerifyRecoveryPhrase'
import BackUpFinish from '../Containers/BackUpFinish'
import Home from '../Containers/Home'
import Contacts from '../Containers/Contacts'
import Transactions from '../Containers/Transactions'
import MyAvatars from '../Containers/MyAvatars'
import styles from './Styles/NavigationStyles'
import { Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Images } from '../Themes'
import Settings from '../Containers/Settings'
import NewContact from '../Containers/NewContact'
import AddContactDone from '../Containers/AddContactDone'
import ContactDetails from '../Containers/ContactDetails'
import TransactionDetails from '../Containers/TransactionDetails'
import NewMyAvatar from '../Containers/NewMyAvatar'
import AskPickPage from '../Containers/AskPickPage'
import AskEnterAmountPage from '../Containers/AskEnterAmountPage'
import AskDone from '../Containers/AskDone'
import AskList from '../Containers/AskList'
import Login from '../Containers/Login'
import Loading from '../Containers/Loading'
import ShowMyAvatar from '../Containers/ShowMyAvatar'

const PrimaryNav = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
      </TouchableOpacity>
    })
  },
  SwiperHome: {
    screen: SwiperHome,
    navigationOptions: {
      title: 'SwiperHome',
      headerStyle: styles.header,
      header: null,
      gesturesEnabled: false
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Transactions: {
    screen: Transactions,
    navigationOptions: {
      header: null
    }
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      header: null
    }
  },
  AddContactDone: {
    screen: AddContactDone,
    navigationOptions: {
      header: null
    }
  },
  ContactDetails: {
    screen: ContactDetails,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  CreateNewWallet: {
    screen: CreateNewWallet,
    navigationOptions: ({ navigation }) => ({
      title: 'Keep in mind',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  SetWalletPassword: {
    screen: SetWalletPassword,
    navigationOptions: ({ navigation }) => ({
      title: 'Set a Wallet Password',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  ResetWalletPassword: {
    screen: ResetWalletPassword,
    navigationOptions: ({ navigation }) => ({
      title: 'Set a Wallet Password',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  SetSpendingPin: {
    screen: SetSpendingPin,
    navigationOptions: ({ navigation }) => ({
      title: 'Set a Spending PIN',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  ResetSpendingPin: {
    screen: ResetSpendingPin,
    navigationOptions: ({ navigation }) => ({
      title: 'Set a Spending PIN',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  SignUpComplete: {
    screen: SignUpComplete,
    navigationOptions: {
      header: null
    }
  },
  Restore: {
    screen: Restore,
    navigationOptions: ({ navigation }) => ({
      title: 'Restore',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  BackUpReminder: {
    screen: BackUpReminder,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  BackUpRecoveryPhrase: {
    screen: BackUpRecoveryPhrase,
    navigationOptions: ({ navigation }) => ({
      title: 'Recovery Phrase',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  BackUpVerifyRecoveryPhrase: {
    screen: BackUpVerifyRecoveryPhrase,
    navigationOptions: ({ navigation }) => ({
      title: 'Verify Recovery Phrase',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  BackUpFinish: {
    screen: BackUpFinish,
    navigationOptions: {
      header: null
    }
  },
  NewContact: {
    screen: NewContact,
    navigationOptions: ({ navigation }) => ({
      title: 'New Contact',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  NewMyAvatar: {
    screen: NewMyAvatar,
    navigationOptions: ({ navigation }) => ({
      title: 'New Avatar',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  ShowMyAvatar: {
    screen: ShowMyAvatar,
    navigationOptions: {
      header: null
    }
  },
  TransactionDetails: {
    screen: TransactionDetails,
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.pop()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  MyAvatars: {
    screen: MyAvatars,
    navigationOptions: ({ navigation }) => ({
      title: 'My Avatars',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>,
      // headerRight: <TouchableOpacity onPress={() => {
      //   navigation.navigate('NewMyAvatar')
      // }}>
      //   <Image style={styles.headerRight} source={Images.icAdd} />
      // </TouchableOpacity>
    })
  },
  AskPickPage: {
    screen: AskPickPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Pick a recipient',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.pop()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  AskEnterAmountPage: {
    screen: AskEnterAmountPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Enter amount',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.pop()
      }}>
        <Image style={styles.headerLeft} source={Images.icBackL} />
      </TouchableOpacity>
    })
  },
  AskDone: {
    screen: AskDone,
    navigationOptions: {
      header: null
    }
  },
  AskList: {
    screen: AskList,
    navigationOptions: ({ navigation }) => ({
      title: 'Asks',
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      headerLeft: <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Image style={styles.headerLeft} source={Images.ic_close} />
      </TouchableOpacity>
    })
  },
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null
    }
  },

}, {
  initialRouteName: 'Loading',
  navigationOptions: {
    headerStyle: styles.header
  }

})
export default createAppContainer(PrimaryNav)
