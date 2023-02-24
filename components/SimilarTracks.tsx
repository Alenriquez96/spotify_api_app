import { useState, useEffect } from "react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { useRouter } from "next/router";

const SimilarTracks = () => {
  const router = useRouter();
  const { track } = router.query;
  const spotifyApi = useSpotify();
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [similarTracks, setSimilarTracks]: any = useState({});

  const fetchSimilarTracks = async () => {
    try {
      const response = await axios(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${track}&limit=${"20"}`,
        { headers }
      );
      const data = response.data;
      console.log(data);

      setSimilarTracks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (track?.length && track) fetchSimilarTracks();
  }, [track]);

  return (
    <div className="bg-[#2b2929] overflow-x-scroll">
      {similarTracks.tracks ? (
        <h2 className="pl-[10%] text-[40px] font-semibold tracking-[4px] my-10">
          SIMILAR SONGS
        </h2>
      ) : (
        ""
      )}
      <div className="flex">
        {similarTracks.tracks
          ? similarTracks.tracks.map((track: any, i: number) => {
              return (
                <div>
                  {track.album ? (
                    <img
                      className="rounded-lg"
                      src={track.album.images[1].url}
                    />
                  ) : (
                    ""
                  )}
                  <p>{track.name}</p>
                  {track.artists.map((artist: any, i: number) => {
                    return <p>{artist.name}</p>;
                  })}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SimilarTracks;
