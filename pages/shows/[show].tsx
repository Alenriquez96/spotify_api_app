import SearchBar from "@/components/SearchBar";

import axios from "axios";
import { useRouter } from "next/router";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import ShowInfo from "@/components/ShowInfo";
import ShowEpisodes from "@/components/ShowEpisodes";
import Layout from "@/components/Layout";

const show = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { show } = router.query;
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [showData, setShowData] = useState<any>({});
  const [loading, setLoading] = useState(false);

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

  return (
    <Layout>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
          <SearchBar />

          {showData.images && <ShowInfo info={showData} isLoading={loading} />}
        </div>
        {showData.episodes && (
          <ShowEpisodes isLoading={loading} episodes={showData.episodes} />
        )}
      </main>
    </Layout>
  );
};

export default show;
