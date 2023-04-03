import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import SearchBar from "@/components/SearchBar";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";

const episode = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { episode } = router.query;
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const [loading, setLoading] = useState(false);
  const [episodeData, setEpisodeData] = useState<any>({});

  const fetchEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/episodes/${episode}`,
        { headers }
      );
      const data = response.data;
      setEpisodeData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, [episode]);

  return (
    <Layout>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
          <SearchBar />
          {!loading ? (
            <div className="max-w-[800px] flex justify-evenly items-center text-white flex-wrap my-[50px]">
              {episodeData.images && (
                <img
                  className="h-[200px] w-[200px] mx-3 shadow-2xl"
                  src={episodeData.images[0].url}
                />
              )}
              <div className="flex flex-col flex-wrap px-[40px] h-[100%] my-2">
                <div className="flex items-center justify-between">
                  <h1 className="font-medium text-[25px] m-1">
                    {episodeData.name}
                  </h1>
                  <p className="text-gray-400 m-1">
                    {millisToMinutesAndSeconds(episodeData.duration_ms)}
                  </p>
                </div>
                <p className="text-gray-400 my-1">{episodeData.description}</p>
                <p className="my-1 text-white">
                  Release: {episodeData.release_date}
                </p>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default episode;
