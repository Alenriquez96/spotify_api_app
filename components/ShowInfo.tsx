import LoadingSpinner from "@/components/LoadingSpinner";

const ShowInfo = ({ info, isLoading }: any) => {
  if (!isLoading) {
    return (
      <div className="max-w-[800px] flex justify-evenly items-center text-white flex-wrap my-[50px]">
        {info.images[0].url ? (
          <img
            className="h-[200px] w-[200px] mx-3 shadow-2xl"
            src={info.images[0].url}
          />
        ) : (
          ""
        )}
        <div className="flex flex-col flex-wrap px-[40px] h-[100%] my-2">
          <h1 className="font-medium text-[25px] my-1">{info.name}</h1>
          <p className="text-gray-400 my-1">By {info.publisher}</p>
          <p className="text-gray-400 my-1">{info.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-[800px] flex justify-evenly items-center text-white flex-wrap my-[50px]">
        <LoadingSpinner />
      </div>
    );
  }
};

export default ShowInfo;
