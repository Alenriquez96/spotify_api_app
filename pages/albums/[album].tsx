import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import AlbumTracks from "@/components/AlbumTracks";
import SearchBar from "@/components/SearchBar";
import Layout from "@/components/Layout";
import useSave from "@/hooks/useSave";
import useSavings from "@/hooks/useSavings";
import useDeleteSaved from "@/hooks/useRemoveSave";

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
  const [isSaved, setIsSaved] = useState(false);

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

  const { savings } = useSavings(router.asPath);

  const { saveItem } = useSave(router.asPath, spotifyApi.getAccessToken());

  const { deleteItem } = useDeleteSaved(
    router.asPath,
    spotifyApi.getAccessToken()
  );

  useEffect(() => {
    if (savings !== null) {
      const savedAlbums = savings.items.map((album: any) => album.album.id);
      setIsSaved(savedAlbums.includes(albumData.id));
    }
  }, [savings]);

  const handleSaveTrack = () => {
    saveItem(albumData.id);
    setIsSaved(true);
  };

  const handleDeleteTrack = () => {
    deleteItem(albumData.id);
    setIsSaved(false);
  };

  return (
    <Layout>
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
        {albumData.tracks ? (
          <AlbumTracks
            tracks={albumData.tracks.items}
            cover={albumData.images}
          />
        ) : (
          ""
        )}
      </main>
    </Layout>
  );
};

export default album;
