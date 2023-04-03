import SearchBar from "@/components/SearchBar";
import Collapsible from "react-collapsible";
import useSavings from "@/hooks/useSavings";
import millisToMinutesAndSeconds from "@/utils/millisToMinutesAndSeconds";
import Layout from "@/components/Layout";

const favorites = () => {
  const { savings } = useSavings(`/tracks/`);

  return (
    <Layout>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500  flex flex-col flex-wrap  items-center">
          <SearchBar />
        </div>

        <Collapsible
          trigger={
            <div className="flex items-center">
              <p className="tracking-widest ml-8 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Songs
                </span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          }
          easing="ease-out"
          transitionTime={300}
        >
          <div className="w-full grid place-content-center">
            {savings &&
              savings.items.map((track: any, i: number) => {
                const trackData = track.track;
                return (
                  <div className="sm:max-w-[527px] mx-4 h-[80px] flex items-center justify-between px-5 my-3 bg-[#2b2929] rounded-lg">
                    <div className="flex items-center">
                      <p className="tracking-normal mx-2 text-[16px] font-normal">
                        {i + 1}
                      </p>
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
                      {trackData.album ? (
                        <img
                          className="mx-2 rounded-md shadow-md"
                          src={trackData.album.images[2].url}
                          alt="cover"
                        />
                      ) : (
                        ""
                      )}
                      <div className="flex flex-col justify-start">
                        <p className="tracking-normal mx-2 text-[16px] font-normal truncate">
                          {trackData.name}
                        </p>
                        <p className="tracking-normal mx-2 font-normal text-[13px] text-gray-400 truncate">
                          {trackData.album.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="tracking-normal mx-2 text-[16px] font-normal">
                        {millisToMinutesAndSeconds(
                          trackData.duration_ms
                        ).toString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="flex items-center">
              <p className="tracking-widest ml-8 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Playlists
                </span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          }
        ></Collapsible>
        <Collapsible
          trigger={
            <div className="flex items-center">
              <p className="tracking-widest ml-8 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Shows
                </span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          }
        ></Collapsible>
      </main>
    </Layout>
  );
};

export default favorites;
