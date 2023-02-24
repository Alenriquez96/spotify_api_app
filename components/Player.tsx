import useSpotify from "@/hooks/useSpotify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { trackUri } from "@/lib/interfaces";
import axios from "axios";

const Player = ({ accessToken }: any) => {
  const spotifyApi = useSpotify();
  const trackUri: any = useSelector(
    (state: trackUri) => state.topTracks.uriSelected
  );
  console.log(trackUri);

  const [isPlaying, setIsPlaying] = useState(false);
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const handlePlayPause = async () => {
    const play = await axios({
      method: "put",
      url: `https://api.spotify.com/v1/me/player/play`,
      headers,
      data: trackUri,
    });
  };

  return (
    <div className="h-24 bg-gradient-to-b from-gray-900 to-black text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
      <div className="flex items-center justify-evenly">
        <div className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        <div className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        {isPlaying ? (
          <div
            className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#18D860]"
            onClick={handlePlayPause}
          >
            Pause
          </div>
        ) : (
          <div
            className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            onClick={handlePlayPause}
          >
            Play
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
