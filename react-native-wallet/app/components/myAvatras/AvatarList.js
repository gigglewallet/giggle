import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import Avatar from './Avatar'

const array = [{ "id": "WK-00078", "chinese_name": "蘇格登12年Glen Ord\r\n單一麥芽蘇格蘭威士忌" }, { "id": "WK-0007", "chinese_name": "蘭威士忌" }, { "id": "WK-1", "chinese_name": "蘇格登1" }, { "id": "WK-2", "chinese_name": "蘇格登2" }, { "id": "WK-3", "chinese_name": "蘇格登3" }, { "id": "WK-4", "chinese_name": "蘇格登4" }, { "id": "WK-5", "chinese_name": "蘇格登5" }, { "id": "WK-6", "chinese_name": "蘇格登6" }, { "id": "WK-7", "chinese_name": "蘇格登7" }, { "id": "WK-8", "chinese_name": "蘇格登8" }, { "id": "WK-9", "chinese_name": "蘇格登9" }, { "id": "WK-10", "chinese_name": "蘇格登10" }]
export default class BgHOC extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) {
            return true
        }

        return false
    }

    render() {
        const { onDelete, onCopy, openQRCode } = this.props
        const data = array.map((item, index) => { return { ...item, index: index + 1 } })
        return (
            // <Text style={styles.text}>{'You need at least 1 avatar to start sending and receiving.'}</Text>
            <FlatList
                style={styles.flatlist}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Avatar item={item} onDelete={onDelete} onCopy={onCopy} openQRCode={openQRCode} />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    text: {
        width: '100%',
        padding: 20,
        textAlign: 'center',
        color: 'black'
    },
    flatlist: {
        width: '100%',
    },
})