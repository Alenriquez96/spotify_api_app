import SearchBar from "@/components/SearchBar";

import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import ShowInfo from "@/components/ShowInfo";
import ShowEpisodes from "@/components/ShowEpisodes";
import Layout from "@/components/Layout";
import useSave from "@/hooks/useSave";
import useSavings from "@/hooks/useSavings";
import useDeleteSaved from "@/hooks/useRemoveSave";

const show = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { show } = router.query;
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [showData, setShowData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchShow = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/shows/${show}`,
        { headers }
      );
      const data = response.data;
      setShowData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShow();
  }, [show]);

  const { savings } = useSavings(router.asPath);
  const { saveItem } = useSave(router.asPath, spotifyApi.getAccessToken());
  const { deleteItem } = useDeleteSaved(
    router.asPath,
    spotifyApi.getAccessToken()
  );

  useEffect(() => {
    if (savings !== null) {
      const savedShows = savings.items.map((show: any) => show.show.id);
      setIsSaved(savedShows.includes(showData.id));
    }
  }, [savings]);

  const handleSaveShow = () => {
    saveItem(showData.id);
    setIsSaved(true);
  };

  const handleDeleteShow = () => {
    deleteItem(showData.id);
    setIsSaved(false);
  };

  return (
    <Layout>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
          <SearchBar />

          {showData.images && <ShowInfo info={showData} isLoading={loading} />}
          {isSaved ? (
            <svg
              onClick={handleDeleteShow}
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
              onClick={handleSaveShow}
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
        {showData.episodes && (
          <ShowEpisodes isLoading={loading} episodes={showData.episodes} />
        )}
      </main>
    </Layout>
  );
};

export default show;
