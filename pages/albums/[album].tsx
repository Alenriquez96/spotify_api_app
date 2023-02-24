import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import AlbumTracks from "@/components/AlbumTracks";
import SearchBar from "@/components/SearchBar";
import UserDropDown from "@/components/UserDropDown";

type AlbumData =
  | {
      tracks: {
        items: [];
      };
    }
  | {}
  | any;

const album = () => {
  const router = useRouter();
  const { album }: any = router.query;
  const spotifyApi = useSpotify();
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [albumData, setAlbumData] = useState<AlbumData>({});

  const fetchAlbumData = async () => {
    if (album)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/albums/${album}`,
          { headers }
        );
        const data = response.data;
        setAlbumData(data);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchAlbumData();
  }, [album]);

  return (
    <main className="min-h-screen min-w-[100vw] bg-[#383838] font-roboto text-white">
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
        <div className="flex items-center w-[100%] justify-evenly">
          <SearchBar />
          <UserDropDown />
        </div>
        <h1 className="pl-[10%] text-[40px] font-semibold tracking-[4px] py-10">
          ALBUM TRACKS
        </h1>
      </div>
      {albumData.tracks ? (
        <AlbumTracks tracks={albumData.tracks.items} cover={albumData.images} />
      ) : (
        ""
      )}
    </main>
  );
};

export default album;
