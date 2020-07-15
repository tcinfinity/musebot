import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  NavigatorIOS,
  AppRegistry,
  Image
} from 'react-native';

import TRACKS from '../App'

export class BrowseTracksView extends Component {
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(TRACKS)
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
   // Return mocked data for now
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(TRACKS)
    });
  }

  render() {
    return (
      <ListView 
       dataSource={this.state.dataSource}
       renderRow={this.renderTrack}
       style={styles.listView}/>
    );
  }

  renderTrack(track) {
    return (
      <TrackCell track={track}/>
    );
  }
};



class TrackCell extends Component {
  render() {
    return (
      <View style={styles.trackCell}>
        <Image
          source={{uri: this.props.track.albumArt}}
          style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.trackTitle}>{this.props.track.title}</Text>
          <Text style={styles.trackArtist}>{this.props.track.artist}</Text>
        </View>
      </View>
    );
  }
};



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  navContainer: {
    flex: 1
  },
  listView: {
     backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  trackCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    padding: 4,
    borderBottomWidth: .5,
    borderColor: 'lightgray'
  },
  rightContainer: {
    flex: 1,
  }
});