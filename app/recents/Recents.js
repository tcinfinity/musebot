import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { ListItem } from 'react-native-elements';

import { TRACKS } from '../App';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();


export default class Recents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titles: this.props.route.params.tracks.map(x => x.title),
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <TouchableOpacity>
      <ListItem
        style={styles.listItem}
        title={this.state.titles[index]}
        subtitle={item.artist}
        leftAvatar={{
          source: item.albumArt
        }}
        bottomDivider
        chevron={{name: 'play-arrow', type: 'materialicons', size: 32}}
      />
    </TouchableOpacity>
  );
  
  render () {

    const navigation = this.props.navigation;

    return (
      // <View style={styles}>
      //   <Text>Playlist Screen</Text>
      //   <Button title="Go back" onPress={() => navigation.goBack()} />
      // </View>
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={tracks}
          renderItem={this.renderItem}
        />
      </View>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  listItem: {
    backgroundColor: 'rgb(20, 20, 20)'
  }
})