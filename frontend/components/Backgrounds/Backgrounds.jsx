import React from 'react';
import videoBackground from './../../src/assets/moon.mp4'; // Import your video file

const VideoBackground = () => {

  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline controls={false} controlsList="nodownload">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
