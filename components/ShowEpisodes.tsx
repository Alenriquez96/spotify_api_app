import { useRouter } from "next/router";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";

const ShowEpisodes = ({ episodes, isLoading }: any) => {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-[1000px]">
      {episodes.items.map((episode: any, i: number) => {
        const cover = episodes.items[i].images;

        return (
          <div key={i} className="flex items-center justify-between px-10 my-5">
            <div className="flex items-center">
              <p className="mx-2">{i}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer transition ease-in-out hover:scale-110 delay-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
              {cover[0].url ? (
                <img
                  onClick={() => router.push(`/episodes/${episode.id}`)}
                  className="mx-2 rounded-md cursor-pointer transition ease-in-out hover:scale-125 hover:grayscale delay-100 h-[64px] w-[64px]"
                  src={cover[0].url}
                  alt="cover"
                />
              ) : (
                ""
              )}
              <div className="flex flex-col justify-start">
                <p className="mx-2">{episode.name}</p>
                <p className="mx-2 text-[13px] text-gray-400">{episode.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="mx-2">
                {millisToMinutesAndSeconds(episode.duration_ms)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowEpisodes;
