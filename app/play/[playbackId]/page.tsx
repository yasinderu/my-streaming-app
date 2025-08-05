"use client";

import { getMovieTrailer } from "@/lib/utils";
import { useParams } from "next/navigation";
import React from "react";
import ReactPlayer from "react-player";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";

export default function PlaybackVideo() {
  const params = useParams<{ playbackId: string }>();

  const playbackId = params.playbackId;

  const playbackUrl = getMovieTrailer(playbackId)?.playback;
  return (
    <div>
      {playbackUrl ? (
        // <MediaController
        //   style={{
        //     width: "100%",
        //     aspectRatio: "16/9",
        //   }}
        // >
        <ReactPlayer
          src={playbackUrl}
          playing={true}
          controls={true}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            // "--controls": "none",
          }}
        ></ReactPlayer>
      ) : (
        //   {/* <MediaControlBar>
        //     <MediaPlayButton />
        //     <MediaSeekBackwardButton seekOffset={10} />
        //     <MediaSeekForwardButton seekOffset={10} />
        //     <MediaTimeRange />
        //     <MediaTimeDisplay showDuration />
        //     <MediaMuteButton />
        //     <MediaVolumeRange />
        //     <MediaPlaybackRateButton />
        //     <MediaFullscreenButton />
        //   </MediaControlBar>
        // </MediaController> */}
        <h1>
          Sorry😞, We don&apos;t have the playback for this movie at the moment.
        </h1>
      )}
    </div>
  );
}
