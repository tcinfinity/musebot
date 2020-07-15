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

const url_list = [require('../../assets/album-art/01.png'), require('../../assets/album-art/02.png'), require('../../assets/album-art/03.png')]


import { useNavigation } from '@react-navigation/native';


export default class Playlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      savedTracks: this.props.route.params.tracks.filter(x => x.liked),
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <TouchableOpacity>
      <ListItem
        style={styles.listItem}
        title={item.title}
        subtitle={item.artist}
        leftAvatar={{
          source: url_list[index]
        }}
        bottomDivider
        chevron={{name: 'play-arrow', type: 'materialicons', size: 32}}
        onPress={() => this.props.navigation.goBack()}
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
          data={this.state.savedTracks}
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