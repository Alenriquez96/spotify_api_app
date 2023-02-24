import { addArtistId, addRecommendations } from "@/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { artistIdState } from "@/lib/interfaces";
import { useRouter } from "next/router";

const RecommendedArtists = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();

  const artistId = useSelector(
    (state: artistIdState) => state.artistId.artistId
  );
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };
  const [recommendations, setRecommendations]: any = useState([]);

  const fetchRecommendations = async () => {
    if (artistId && artistId.length)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          { headers }
        );
        const data = response.data.artists;
        setRecommendations([...data]);
        dispatch(addRecommendations(data));
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [artistId]);

  return (
    <div className="py-[50px]">
      {recommendations.length ? (
        <h2 className="pl-[10%] text-[40px] font-semibold tracking-[4px] my-10">
          OTHER ARTISTS LIKE THIS
        </h2>
      ) : (
        ""
      )}
      {/* <div className="flex  overflow-x-scroll  max-h-[200px]">
        {recommendations
          .slice(1, recommendations.length)
          .map((recomm: recomm: { images: { url: string }[]; name: string; id: string }, i: number) => {
            const length = recomm.images.length - 1;
            return (
              <div
                onClick={() => dispatch(addArtistId(recomm.id))}
                className="flex flex-col mx-5 cursor-pointer"
              >
                {recomm.images[length] !== undefined ? (
                  <img
                    className="w-[70px] h-[70px]"
                    src={recomm.images[length].url}
                  />
                ) : (
                  ""
                )}
                <p>{recomm.name}</p>
              </div>
            );
          })}
      </div> */}

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {recommendations.length
          ? recommendations.map(
              (
                recomm: { images: { url: string }[]; name: string; id: string },
                i: number
              ) => {
                const length = recomm.images.length - 1;

                return (
                  <SwiperSlide key={i} style={{ width: "300px !important" }}>
                    <div
                      onClick={() => {
                        dispatch(addArtistId(recomm.id));
                        router.push(`/artists/${recomm.id}`);
                      }}
                      className="w-[100px] flex flex-col mx-5 cursor-pointer"
                    >
                      {recomm.images[length] !== undefined ? (
                        <img
                          className="w-[100px] h-[100px]"
                          src={recomm.images[length].url}
                        />
                      ) : (
                        ""
                      )}
                      <p className="text-[18px] font-medium tracking-wider">
                        {recomm.name}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              }
            )
          : ""}
      </Swiper>
    </div>
  );
};

export default RecommendedArtists;
