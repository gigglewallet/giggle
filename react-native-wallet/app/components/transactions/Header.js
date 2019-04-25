import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { ApplicationStyles, Images } from '../../themes'

export default class Index extends React.Component {
    render() {
        const { goBack, goSetting, setting, title } = this.props
        return (
            <View style={styles.header}>
                {setting ?
                    <TouchableOpacity activeOpacity={0.6} onPress={goSetting} style={styles.settingWrapper}>
                        <Image style={ApplicationStyles.headerIcon} source={Images.ic_setting} />
                    </TouchableOpacity>
                    :
                    <View style={styles.empty} />
                }
                <Text style={ApplicationStyles.headerTitle}>{title}</Text>

                <TouchableOpacity activeOpacity={0.6} onPress={goBack} style={styles.backWrapper}>
                    <Image style={ApplicationStyles.headerIcon} source={Images.button_right} />
                </TouchableOpacity>
            </View>
        )
    }
}

const pad = 20
const styles = StyleSheet.create({
    header: {
        ...ApplicationStyles.navBar,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    empty: {
        width: ApplicationStyles.headerIcon.width + pad,
        height: 1,
    },
    settingWrapper: {
        paddingLeft: pad,
    },
    backWrapper: {
        paddingRight: pad,
    },
});