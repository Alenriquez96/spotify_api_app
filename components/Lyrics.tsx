import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Lyrics = () => {
  const router = useRouter();
  const { track } = router.query;
  const [lyrics, setLyrics]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>({});

  const getLyrics = async () => {
    setIsLoading(true);
    try {
      const response = await axios(
        `https://spotify-lyric-api.herokuapp.com/?trackid=${track}`
      );
      const data = response.data;
      setLyrics(data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (track && track.length) getLyrics();
  }, [track]);

  return (
    <div className="my-6 grid place-content-center">
      {!isLoading ? (
        <section className="text-center">
          {!error.error ? (
            lyrics.lines.map((line: { words: string }, i: number) => {
              return <p key={i}>{line.words}</p>;
            })
          ) : (
            <p>{error.message}</p>
          )}
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Lyrics;
