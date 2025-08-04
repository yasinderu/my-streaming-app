import React from "react";
import ReactPlayer from "react-player";

export default function PlaybackVideo() {
  return (
    <div>
      <ReactPlayer
        src="https://www.youtube.com/watch?v=GokKUqLcvD8"
        playing={true}
        controls
        style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
      />
    </div>
  );
}
