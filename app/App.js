// import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Navigator
} from 'react-native';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';

import Playlist from './playlist/Playlist';
import Recents from './recents/Recents';

import { NavigationContainer, useNavigation, TabRouter } from '@react-navigation/native';
import { 
  createStackNavigator,
  TransitionSpecs, 
} from '@react-navigation/stack';

import generateName from './scripts/MetaGenerator';

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { set } from 'react-native-reanimated';


const Stack = createStackNavigator();

const MyTransition = {
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}



const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Player" 
          screenOptions={{
            headerShown: false,
            ...MyTransition,
            headerTintColor: '#aaa',
            
            headerStyle: {
              backgroundColor: 'rgb(4, 4, 4)'
            }
          }}
          
          // gestureDirection='vertical'
          
          // mode="modal"
          // gestureDirection='inverted'
          // navigationOptions={{
          //   gesturesEnabled: true,
          //   gestureDirection:'inverted',
          //   gestureResponseDistance:{
          //       vertical:600,
          //   }
          // }}
        >
          <Stack.Screen 
            name="Player" 
            component={PlayerApp}
            options={{ title: 'Back to Song' }}
            // options={{headerShown: false}} 
          />
          <Stack.Screen 
            name="Playlist" 
            component={Playlist}
            options={{ headerShown: true, title: 'Saved Songs' }} />
          <Stack.Screen 
            name="Recents" 
            component={Recents} 
            options={{ headerShown: true, title: 'Recently Played' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


// Define react context to pass props into Player for react-navigation
class PlayerApp extends Component {
  render() {
    return (
      <Player tracks={[]} navigation={this.props.navigation} />
    );
  }
}



class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      currentTrackLiked: this.props.tracks[0].liked,
    };

  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);

      const track = this.props.tracks[this.state.selectedTrack - 1];
      this.setState({currentTrackLiked: track.liked});

    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);

      const track = this.props.tracks[this.state.selectedTrack + 1];
      console.log(track)
      this.setState({currentTrackLiked: track.liked});
    }
  }

  // TODO: Load next video when video end
  onEnd() { // same as onForward
    // if (this.state.selectedTrack < this.props.tracks.length - 1) {
    //   this.refs.audioElement && this.refs.audioElement.seek(0);
    //   this.setState({ isChanging: true }); // <-------
    //   setTimeout(() => this.setState({
    //     currentPosition: 0,
    //     totalLength: 1,
    //     paused: false,
    //     isChanging: false,
    //     selectedTrack: this.state.selectedTrack + 1,
    //   }), 0);
    // }
  }

  onAddLike() {
    this.setState({currentTrackLiked: true});
    this.props.tracks[this.state.selectedTrack].liked = true;
    showMessage({
      message: "Song saved to playlist"
    })
  }

  onRemoveLike() {
    this.setState({currentTrackLiked: false});
    this.props.tracks[this.state.selectedTrack].liked = false;
    showMessage({
      message: "Song removed from playlist"
    })
  }


  queuePress() {
    const navigation = this.props.navigation;
    navigation.navigate('Playlist', {tracks: this.props.tracks, onGoBack: this.onSelect})
    setTimeout(() => {
      this.onForward(); 
      this.onForward();
    }, 10000)
    // this.setState({ isChanging: true });
    // setTimeout(() => {
    //   this.setState({
    //     currentPosition: 0,
    //     paused: true,
    //     totalLength: 1,
    //     selectedTrack: 2,
    //     currentTrackLiked: this.props.tracks[2].liked,
    //   })
    // }, 1000)
  }

  render() {
    const track = this.props.tracks[this.state.selectedTrack];

    const video = this.state.isChanging ? null : (
      <Video source={track.audio} // Can be a URL (uri: track.audioUrl) or a local file (file:///...).
        ref="audioElement"
        paused={this.state.paused}              // Pauses playback entirely.
        resizeMode="cover"                      // Fill the whole screen at aspect ratio.
        repeat={this.state.repeatOn}            // Repeat based on controls
        onLoadStart={this.loadStart}            // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}                      // Callback when playback finishes
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.audioElement} />
    );

    const navigation = this.props.navigation;

    // TODO: remove shuffle (no shuffle needed for generation) / get shuffle to work for favourited music list

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header message="Playing From MuseBot" navigation={navigation} onRecentPress={() => navigation.navigate('Recents', {tracks: this.props.tracks})} onQueuePress={() => this.queuePress()} />
        <AlbumArt img={track.albumArt} />
        <TrackDetails 
          title={track.title} 
          artist={track.artist} 
          liked={this.state.currentTrackLiked}
          onBlankLikePress={this.onAddLike.bind(this)}
          onFilledLikePress={this.onRemoveLike.bind(this)} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused} />
        {video}
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  playlistHeader: {
    fontSize: 8
  }
};