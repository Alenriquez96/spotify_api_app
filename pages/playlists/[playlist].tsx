import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

import PlaylistTracks from "@/components/PlaylistTracks";
import PlaylistInfo from "@/components/PlaylistInfo";

type PlaylistType =
  | {
      tracks: {
        items: [];
      };
    }
  | {}
  | any;

const playlist = () => {
  const router = useRouter();
  const { playlist }: any = router.query;
  const spotifyApi = useSpotify();
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [playlistData, setPlaylistData] = useState<PlaylistType>({});
  console.log(playlistData);

  const fetchPlaylistData = async () => {
    if (playlist)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist}`,
          { headers }
        );
        const data = response.data;
        setPlaylistData(data);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchPlaylistData();
  }, [playlist]);

  return (
    <main className="min-h-screen min-w-[100vw] bg-[#383838] font-roboto text-white">
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
        <SearchBar />

        <PlaylistInfo info={playlistData} />
      </div>
      {playlistData.tracks ? (
        <PlaylistTracks tracks={playlistData.tracks.items} />
      ) : (
        ""
      )}
    </main>
  );
};

export default playlist;
