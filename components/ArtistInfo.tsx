import adjustPopularity from "@/utils/adjustPopularity";

interface Info {
  info: {
    name: string;
    followers: {
      total: string;
    };
    images: {
      url: string;
    }[];
    popularity: number;
  };
}

const ArtistInfo = ({ info }: Info) => {
  let stars = new Array(adjustPopularity(info.popularity));

  return (
    <>
      {info.name && (
        <div className="max-w-[800px] flex justify-evenly items-center text-white flex-wrap my-[50px]">
          {info.images[1].url ? (
            <img
              className="h-[200px] w-[200px] mx-3 shadow-2xl"
              src={info.images[1].url}
            />
          ) : (
            ""
          )}
          <div className="flex flex-col flex-wrap px-[20px] h-[100%]">
            <h1 className="font-medium text-[25px]">{info.name}</h1>
            <p className="text-gray-400">Followers: {info.followers.total}</p>
            <div className="flex items-center">
              {stars.fill(undefined).map((item: {}, i: number) => {
                return (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistInfo;
