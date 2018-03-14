import * as React from 'react';

import * as styles from './video-player.component.scss';


interface VideoPlayerProps {
  autoPlay?: boolean;
  controls?: boolean;
  src: string;
}
interface VideoPlayerState {
}

export class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
  player: HTMLVideoElement;

  static get defaultProps() {
    return {
      controls: true,
      autoPlay: false,
    }
  }


  render() {
    const {src} = this.props;

    return (
      <div className={styles.playerWrap}>
        <video ref={x => this.player = x} src={src} {...this.props}></video>
      </div>
    );
  }
}