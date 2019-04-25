import React from 'react'
import { StyleSheet, Animated, Text } from 'react-native'
import { Metrics } from '../../themes'
import { COPIED_SHOW_TIEM } from '../../constants/times'

export default class Index extends React.Component {
    state = {
        fade: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(
            this.state.fade,
            {
                toValue: 1,
                duration: COPIED_SHOW_TIEM / 2,
            }).start();
    }

    render() {
        return (
            this.props.isShow && (
                <Animated.View
                    style={{ ...styles.wrapper, opacity: this.state.fade }} >
                    <Text style={styles.text}>Link Copied</Text>
                </Animated.View>
            )
        )
    }
}

const height = 90
const width = 220
const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        height: height,
        width: width,
        top: (Metrics.screenHeight - height) / 2,
        left: (Metrics.screenWidth - width) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 5,
    },
    text: {
        color: 'black',
        fontSize: 30,
    }
})