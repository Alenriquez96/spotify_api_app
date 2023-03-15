import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import AlbumTracks from "@/components/AlbumTracks";
import SearchBar from "@/components/SearchBar";

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
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap  items-center">
        <SearchBar />
        <div className="px-[10%] py-10 flex flex-col items-center">
          {albumData.images && (
            <img
              className="h-[200px] w-[200px] mx-3 shadow-2xl"
              src={albumData.images[0].url}
            />
          )}
          <h1 className=" text-[40px] font-semibold tracking-[4px] ">
            {albumData.name}
          </h1>
          <div className="flex flex-col items-end w-[100%]">
            {albumData.release_date && (
              <p className="text-gray-400">
                {albumData.release_date.slice(0, 4)}
              </p>
            )}
            {albumData.label && (
              <p className="text-gray-400">{albumData.label}</p>
            )}
          </div>
        </div>
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
