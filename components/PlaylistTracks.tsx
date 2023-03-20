import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";
import { useRouter } from "next/router";
type Tracks = {
  tracks: {
    name: string;
    duration_ms: number;
    id: string;
  }[];
};

const PlaylistTracks = ({ tracks }: any) => {
  const router = useRouter();
  return (
    <div className="flex flex-col max-w-[1000px]">
      {tracks.map(
        (
          track: {
            track: {
              name: string;
              duration_ms: number;
              id: string;
              album: {
                images: {
                  url: string;
                }[];
                name: string;
              };
            };
          },
          i: number
        ) => {
          const cover = track.track.album.images;

          return (
            <div
              key={i}
              className="flex items-center justify-between px-10 my-5"
            >
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
                    onClick={() => router.push(`/tracks/${track.track.id}`)}
                    className="mx-2 rounded-md cursor-pointer transition ease-in-out hover:scale-125 hover:grayscale delay-100 h-[64px] w-[64px]"
                    src={cover[0].url}
                    alt="cover"
                  />
                ) : (
                  ""
                )}
                <div className="flex flex-col justify-start">
                  <p className="mx-2">{track.track.name}</p>
                  <p className="mx-2 text-[13px] text-gray-400">
                    {track.track.album.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mx-2">
                  {millisToMinutesAndSeconds(track.track.duration_ms)}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PlaylistTracks;
