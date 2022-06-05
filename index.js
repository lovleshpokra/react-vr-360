import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Video,
  Scene,
  NativeModules,
  Environment,
  asset,
  MediaPlayerState,
  VrButton
} from 'react-360';
// import WebVRPolyfill from 'webvr-polyfill';
const {AudioModule, VideoModule} = NativeModules;

export default class Hello360 extends React.Component {
  constructor() {
    super();
    this.state = {
      audioPlaying: false,
      subpage: false,
      isVideoBg: false
    };
    this.audioPlay = this.audioPlay.bind(this);
    this.audioPause = this.audioPause.bind(this);
    this.updateBgImage = this.updateBgImage.bind(this);
    this.videoHandler = this.videoHandler.bind(this);
    // this.polyfill = new WebVRPolyfill();
  }
  updateBgImage() {
    this.setState({subpage: !this.state.subpage, isVideoBg: false}, 
      () => {
        AudioModule.stop('myaudio');
        AudioModule.destroy('myaudio');
       
        this.setState({audioPlaying: false});
        if(this.state.subpage) {
          Environment.setBackgroundImage(asset('subpage.jpg'), {format: '3DTB'});
        } else {
          Environment.setBackgroundImage(asset('main.jpg'), {format: '3DTB'});
        }
      }
      );
  }
  videoHandler() {
    this.setState({subpage: true, isVideoBg: true}, 
      () => {
        AudioModule.stop('myaudio');
        AudioModule.destroy('myaudio');
        this.setState({audioPlaying: false});
        VideoModule.createPlayer('myplayer');
        VideoModule.play('myplayer', {
          source: {url: './static_assets/video360.mp4'},
          stereo: '3DTB',
        });
        Environment.setBackgroundVideo('myplayer');
        }
      );
  }
  audioPlay() {
        AudioModule.createAudio('myaudio', {
        source: asset('audio.mp3'),
        is3d: false
      });
      AudioModule.play('myaudio', {
        loop: true,
      });
      this.setState({audioPlaying: true});}
    audioPause() {
      AudioModule.stop('myaudio');
      AudioModule.destroy('myaudio');
      this.setState({audioPlaying: false});
    }
  render() {
    return (
      <View>
        {
          !this.state.subpage ? <View>
             <Scene>
         <VrButton
          style={styles.subpage}
          onClick={this.updateBgImage} >
          </VrButton>
          </Scene>
          <Scene>
        <Video
          style={styles.video}
          source={ asset('video.mp4', {format: '3D'}) }
          playerState={
            new MediaPlayerState({
              autoPlay: true,
              muted: true,
              loop:true
              })
          }
          loop={true}
        />
        </Scene>
      <Scene>
      <VrButton style={styles.audio}
                onEnter={this.audioPlay}
                onExit={this.audioPause}
                >
                </VrButton>
      </Scene>
      <Scene>
      <VrButton style={styles.subpage2}
                onClick={this.videoHandler}>
                </VrButton>
      </Scene>
      </View> : <Scene>
              <VrButton
                style={styles.subpage1}
                onClick={this.updateBgImage} >
                </VrButton>
                </Scene>}
      </View>);
  }
};

const styles = StyleSheet.create({
  video: {
    width: 430,
    height: 245,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        translate: [260, -180, 0]
      }
    ]
  },
  subpage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    backgroundColor: '#c62925',
    transform: [
      {
        translate: [0, -250, 0]
      }
    ]
  },
  subpage1: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#c62925',
    backgroundColor: '#FFFFFF',
    transform: [
      {
        translate: [200, -150, 0]
      }
    ]
  },
  subpage2: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#c62925',
    backgroundColor: '#FFFFFF',
    transform: [
      {
        translate: [850, -260, 0]
      }
    ]
  },
  audio: {
    width: 330,
    height: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    transform: [
      {
        translate: [760, -500, 0]
      }
    ]
  }
});

AppRegistry.registerComponent('Hello360', () => Hello360);
