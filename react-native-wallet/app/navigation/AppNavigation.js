import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import * as RouteNames from '../constants/routeName'
import Launch from '../containers/Launch'
import Home from '../containers/Home'
import MyAvatars from '../containers/MyAvatars'
import Contact from '../containers/Contact'
import TransactionHistory from '../containers/TransactionHistory'
import HomeSwiper from '../components/HomeSwiper'
import TransactionStatus from '../containers/transaction/Status'
import TransactionRequest from '../containers/transaction/Request'
import ContactDetail from '../containers/contact/Detail'
import ContactEdit from '../containers/contact/Edit'
import AskGrin from '../containers/AskGrin'
import SendGrin from '../containers/SendGrin'
import AskAmount from '../containers/AskAmount'
import SendAmount from '../containers/SendAmount'
import NewRecipient from '../containers/NewRecipient'


const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps

            const toIndex = index
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            })

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const slideFromBottom = { transform: [{ translateY }] }
            const lastSceneIndex = scenes[scenes.length - 1].index
            // Test whether we're skipping back more than one screen
            // if (lastSceneIndex - toIndex > 1) {
            //     // Do not transoform the screen being navigated to
            //     if (scene.index === toIndex) return
            //     // Hide all screens in between
            //     if (scene.index !== lastSceneIndex) return { opacity: 0 }
            //     // Slide top screen down
            //     return slideFromBottom
            // }

            //back more one page one time
            if (toIndex === 0 && scenes.length > 2) return null

            //navigate to myavatras container
            if (scenes[toIndex].route.routeName === RouteNames.MYAVATRAS)
                return slideFromBottom

            //navigate to other container from myavatars           
            if (thisSceneIndex > toIndex && scenes[thisSceneIndex].route.routeName === RouteNames.MYAVATRAS)
                return slideFromBottom

            return slideFromRight
        },
    }
}

const PrimaryNav = createStackNavigator(
    {
        [RouteNames.LAUNCH]: { screen: Launch },
        [RouteNames.HOME]: { screen: Home },
        [RouteNames.MYAVATRAS]: { screen: MyAvatars },
        [RouteNames.CONTACT]: { screen: Contact },
        [RouteNames.TRANSACTION_HISTORY]: { screen: TransactionHistory },
        [RouteNames.HOME_SWIPER]: { screen: HomeSwiper },
        [RouteNames.TRANSACTION_STATUS]: { screen: TransactionStatus },
        [RouteNames.TRANSACTION_REQUEST]: { screen: TransactionRequest },
        [RouteNames.CONTACT_DETAIL]: { screen: ContactDetail },
        [RouteNames.CONTACT_EDIT]: { screen: ContactEdit },
        [RouteNames.ASK_GRIN]: { screen: AskGrin },
        [RouteNames.SEND_GRIN]: { screen: SendGrin },
        [RouteNames.ASK_AMOUNT]: { screen: AskAmount },
        [RouteNames.SEND_AMOUNT]: { screen: SendAmount },
        [RouteNames.NEW_RECIPIENT]: { screen: NewRecipient },
    },
    {
        initialRouteName: RouteNames.HOME_SWIPER,
        defaultNavigationOptions: {
            header: null,
            tabBarVisible: false,
        },
        transitionConfig,
    }
)

export default createAppContainer(PrimaryNav)

