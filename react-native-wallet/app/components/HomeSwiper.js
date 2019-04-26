import React from 'react'
import Swiper from 'react-native-swiper';
import Home from '../containers/Home'
import Contact from '../containers/Contact'
import TransactionHistory from '../containers/TransactionHistory'

export default class HomeSwiper extends React.Component {

  getSwiperRef = id => {
    this.swiper = id
  }

  scrollTo = prev => e => {
    if (!this.swiper) return
    this.swiper.scrollBy(prev ? -1 : 1)
  }

  render() {
    return (
      <Swiper
        ref={this.getSwiperRef}
        showsButtons={true}
        index={1}
        loop={false}
        showsPagination={false}
        showsButtons={false}>
        <TransactionHistory
          {...this.props}
          scrollToHome={this.scrollTo(false)} />
        <Home
          {...this.props}
          scrollToTransactionHistory={this.scrollTo(true)}
          scrollToContact={this.scrollTo(false)} />
        <Contact
          {...this.props}
          scrollToHome={this.scrollTo(true)} />
      </Swiper >
    );
  }
}
