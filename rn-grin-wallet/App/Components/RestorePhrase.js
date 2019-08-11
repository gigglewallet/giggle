import Autocomplete from 'native-base-autocomplete' /* eslint-disable-line import/no-unresolved */
import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import {
  Container,
  Content,
  Text,
  ListItem
} from 'native-base'
import { Phrase } from '../Config/Wordlist_en'

class RestorePhrase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keywords: [],
      query: '',
      selectedKeyword: null
    }
  }

  componentDidMount () {
    this.setState({ keywords: Phrase })
  }

  findKeyword (query) {
    if (query === '') {
      return []
    }

    const { keywords } = this.state
    const regex = new RegExp(`${query.trim()}`, 'i')
    return keywords.filter(keyword => keyword.keyword.search(regex) >= 0)
  }

  render () {
    const { query, selectedKeyword } = this.state
    const keywords = this.findKeyword(query)
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()
    return (
      <Container style={styles.container}>
        <Content>
          <Autocomplete
            autoCapitalize='none'
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            listContainerStyle={styles.listContainerStyle}
            listStyle={styles.listContainerStyle}
            data={keywords.length === 1 && comp(query, keywords[0].keyword)
              ? [] : keywords}
            defaultValue={query}
            hideResults={selectedKeyword && selectedKeyword.keyword === query}
            onChangeText={text => this.setState({ query: text })}
            renderItem={emp => <ListItem

              onPress={() => (
                this.setState({ query: emp.keyword, selectedKeyword: emp })
              )}
            >
              <Text>{emp.keyword}</Text>
            </ListItem>}
          />

          <View style={{ height: 500, backgroundColor: 'transparent' }} />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b2b44',
    color: '#fff',
    width: 108,
    height: 32,
    borderColor: '#7878f0',
    margin: 10
  },

  inputContainerStyle: {
    color: '#fff',
    padding: 2,
    backgroundColor: '#2b2b44',
    width: 108,
    height: 32,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#7878f0'
  },
  listContainerStyle: {
    backgroundColor: 'transparent',
    borderColor: '#2b2b44'
  }
})

export default RestorePhrase
