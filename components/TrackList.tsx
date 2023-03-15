import { useSelector, useDispatch } from "react-redux";
import { topTracksState } from "@/lib/interfaces";
import { addUri } from "@/redux/actions/actions";
import { useRouter } from "next/router";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";

const TrackList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const topTracks = useSelector(
    (state: topTracksState) => state.topTracks.topTracks
  );

  return (
    <div className="max-w-[1000px] lg:w-[50%] flex flex-col">
      {topTracks.length ? (
        <h1 className="pl-[10%] text-[40px] font-semibold tracking-[4px] my-10">
          TOP TRACKS
        </h1>
      ) : (
        ""
      )}
      {topTracks.map(
        (
          tracks: {
            album: {
              images: { url: string }[];
            };
            name: string;
            duration_ms: number;
            uri: string;
            id: string;
          },
          i: number
        ) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between px-10 my-5"
            >
              <div className="flex items-center ">
                <p className="mx-2">{i}</p>
                <svg
                  onClick={() => dispatch(addUri(tracks.uri))}
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
                <img
                  className="mx-2 rounded-md cursor-pointer transition ease-in-out hover:scale-125 hover:grayscale delay-100"
                  src={tracks.album.images[2].url}
                  onClick={() => router.push(`/tracks/${tracks.id}`)}
                />
                <p className="mx-2">{tracks.name}</p>
              </div>
              <div className="flex items-center">
                <p className="mx-2">
                  {millisToMinutesAndSeconds(tracks.duration_ms).toString()}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default TrackList;
