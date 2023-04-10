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

      setSimilarTracks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (track?.length && track) fetchSimilarTracks();
  }, [track]);

  return (
    <div className="bg-[#2b2929] overflow-x-scroll mt-[20px] mx-[20px] rounded-lg">
      {similarTracks.tracks ? (
        <h2 className="pl-[10%] text-[40px] font-semibold tracking-[4px] my-10">
          SIMILAR SONGS
        </h2>
      ) : (
        ""
      )}
      <div className="flex max-w-[1000px] overflow-x-scroll mx-[10%]">
        {similarTracks.tracks
          ? similarTracks.tracks.map((track: any, i: number) => {
              return (
                <div
                  key={i}
                  onClick={() => router.push(`/tracks/${track.id}`)}
                  className="mx-2 max-h-[250px] cursor-pointer"
                >
                  {track.album ? (
                    <img
                      className="rounded-lg h-[100px] min-w-[100px]"
                      src={track.album.images[1].url}
                    />
                  ) : (
                    ""
                  )}
                  <p key={i}>{track.name}</p>
                  {track.artists.map((artist: { name: string }, j: number) => {
                    return (
                      <p className="text-gray-400" key={j}>
                        {artist.name}
                      </p>
                    );
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
