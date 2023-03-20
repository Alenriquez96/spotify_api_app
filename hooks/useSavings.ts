import { useState, useEffect } from "react";
import axios from "axios";
import useSpotify from "./useSpotify";

function useSavings(endpoint: string) {
  const spotifyApi = useSpotify();
  const [savings, setSavings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/${endpoint.split("/")[1]}`,
        {
          headers,
        }
      );
      const data = response.data;
      setSavings(data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { savings, isLoading, error };
}

export default useSavings;
