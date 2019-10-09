import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import Transactions from './Transactions'
import Contacts from './Contacts'
import Home from './Home'
// Styles

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'

class SwiperHome extends Component {
  getSwiperRef = id => {
    this.swiper = id
  }
  scrollTo = prev => e => {
    if (!this.swiper) return
    this.swiper.scrollBy(prev ? -1 : 1)
  }
  render () {
    return (
      <Swiper
        ref={this.getSwiperRef}
        index={1}
        loop={false}
        showsPagination={false}
        showsButtons={false} >
        <Transactions
          {...this.props}
          scrollToHome={this.scrollTo(false)}
        />
        <Home
          {...this.props}
          scrollToContracts={this.scrollTo(false)}
          scrollToTransactions={this.scrollTo(true)}
        />
        <Contacts
          {...this.props}
          scrollToHome={this.scrollTo(true)}
        />
      </Swiper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentWallet: state.giggle.currentWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    walletRecovery: (avatarCode, password, mnemonic) => dispatch(GiggleActions.walletRecovery(avatarCode, password, mnemonic)),
    updateRestorePhrase: (phrase) => dispatch(GiggleActions.updateRestorePhrase(phrase))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwiperHome)
