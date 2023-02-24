import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

const Lyrics = () => {
  const router = useRouter();
  const { track } = router.query;
  const [lyrics, setLyrics]: any = useState({});

  const getLyrics = async () => {
    try {
      const response = await axios(
        `https://spotify-lyric-api.herokuapp.com/?trackid=${track}`
      );
      const data = response.data;
      setLyrics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (track && track.length) getLyrics();
  }, [track]);

  return (
    <div>
      <section className="text-center">
        {lyrics.lines
          ? lyrics.lines.map((line: any) => {
              return <p>{line.words}</p>;
            })
          : ""}
      </section>
    </div>
  );
};

export default Lyrics;
