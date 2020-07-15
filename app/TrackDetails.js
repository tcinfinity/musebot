import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const TrackDetails = ({
  title,
  artist,
  liked=false,
  onBlankLikePress,
  onFilledLikePress
}) => (
  <View style={styles.container}>
    {/* <TouchableOpacity onPress={onAddPress}>
      <Image style={styles.button}
        source={require('../img/baseline_add_circle_outline_white_18pt.png')} />
    </TouchableOpacity> */}
    <View style={styles.detailsWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
    {!liked ?
      <TouchableOpacity onPress={onBlankLikePress}>
        <View style={styles.likeButton}>
          <Image style={styles.likeButtonIcon}
            source={require('../img/baseline_favorite_border_white_36pt.png')} />
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onFilledLikePress}>
      <View style={styles.likeButton}>
        <Image style={styles.likeButtonIcon}
          source={require('../img/baseline_favorite_white_36pt.png')} />
      </View>
    </TouchableOpacity>
    }
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  likeButton: {
    // borderColor: 'rgb(255, 255, 255)',
    // borderWidth: 2,
    opacity: 0.72,
    // borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonIcon: {
    height: 30,
    width: 30,
  }
});