import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { useSelector } from "react-redux";
import { addArtistId } from "@/redux/actions/actions";
import { artistIdState } from "@/lib/interfaces";

function useArtistId(endpoint: string) {
  const spotifyApi = useSpotify();
  const [artistIdInfo, setartistIdInfo] = useState({});
  const artistId = useSelector(
    (state: artistIdState) => state.artistId.artistId
  );

  useEffect(() => {
    if (artistId.length)
      try {
        const fetchSongInfo = async () => {
          const trackInfo = await fetch(
            // `https://api.spotify.com/v1/tracks/${artistId}`,
            endpoint,
            {
              headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
              },
            }
          );
          const res = await trackInfo.json();
          setartistIdInfo(res);
        };

        fetchSongInfo();
      } catch (error) {
        console.log(error);
      }
  }, [artistIdInfo]);

  return artistIdInfo;
}

export default useArtistId;
