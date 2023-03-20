import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import Lyrics from "@/components/Lyrics";
import SimilarTracks from "@/components/SimilarTracks";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";
import useSavings from "@/hooks/useSavings";
import useSave from "@/hooks/useSave";
import useDeleteSaved from "@/hooks/useRemoveSave";

const track = () => {
  const router = useRouter();
  const { track } = router.query;
  const [trackData, setTrackData]: any = useState({});
  const spotifyApi = useSpotify();
  const [isSaved, setIsSaved] = useState(false);

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

  const { savings, isLoading, error } = useSavings(router.asPath);

  useEffect(() => {
    if (savings !== null) {
      const savedTracks = savings.items.map((track: any) => track.track.id);
      setIsSaved(savedTracks.includes(trackData.id));
    }
  }, [savings]);

  const { saveTrack, isSaving, success } = useSave(
    router.asPath,
    spotifyApi.getAccessToken()
  );

  const handleSaveTrack = () => {
    saveTrack(trackData.id);
    setIsSaved(true);
  };

  const { deleteTrack, isDeleted } = useDeleteSaved(
    router.asPath,
    spotifyApi.getAccessToken()
  );

  const handleDeleteTrack = () => {
    deleteTrack(trackData.id);
    setIsSaved(false);
  };

  useEffect(() => {
    if (track && track.length) fetchTrackInfo();
  }, [track]);

  return (
    <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500  flex flex-col flex-wrap  items-center">
        <SearchBar />

        <div className="sm:min-w-[527px] min-w-full flex items-center justify-between px-10 my-16">
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
            {isSaved ? (
              <svg
                onClick={handleDeleteTrack}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                />
              </svg>
            ) : (
              <svg
                onClick={handleSaveTrack}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <Lyrics />
      <SimilarTracks />
    </main>
  );
};

export default track;
