import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import Lyrics from "@/components/Lyrics";
import SimilarTracks from "@/components/SimilarTracks";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";

const track = () => {
  const router = useRouter();
  const { track } = router.query;
  const [trackData, setTrackData]: any = useState({});
  const spotifyApi = useSpotify();

  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const fetchTrackInfo = async () => {
    try {
      const response = await axios(
        `https://api.spotify.com/v1/tracks/${track}`,
        { headers }
      );
      const data = response.data;
      setTrackData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (track && track.length) fetchTrackInfo();
  }, [track]);

  return (
    <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500  flex flex-col flex-wrap  items-center">
        <SearchBar />

        <div className="min-w-[527px] flex items-center justify-between px-10 my-16">
          <div className="flex items-center">
            <p className="mx-2">1</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer transition ease-in-out hover:scale-110 delay-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
            {trackData.album ? (
              <img
                className="mx-2 rounded-md shadow-md"
                src={trackData.album.images[2].url}
                alt="cover"
              />
            ) : (
              ""
            )}
            <p className="mx-2">{trackData.name}</p>
          </div>
          <div className="flex items-center">
            <p className="mx-2">
              {millisToMinutesAndSeconds(trackData.duration_ms).toString()}
            </p>
          </div>
        </div>
      </div>
      <Lyrics />
      <SimilarTracks />
    </main>
  );
};

export default track;
