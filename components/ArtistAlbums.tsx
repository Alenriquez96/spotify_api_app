import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import { addAlbumId } from "@/redux/actions/actions";
import Link from "next/link";
import Router from "next/router";
import { artistIdState } from "@/lib/interfaces";

const ArtistAlbums = () => {
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const artistId = useSelector(
    (state: artistIdState) => state.artistId.artistId
  );
  const [albums, setAlbums] = useState<any[]>([]);
  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const fetchAlbums = async () => {
    if (artistId && artistId.length)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums`,
          { headers }
        );
        const data = response.data.items;

        setAlbums(data);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchAlbums();
  }, [artistId]);

  return (
    <div className="m-14 max-h-[450px] lg:max-h-[1180px] lg:w-[50%] shadow-2xl bg-[#2b2929] rounded-lg overflow-y-scroll ">
      {albums.length ? (
        <h2 className="pl-[10%] text-[40px] font-semibold tracking-[4px] my-10">
          ALBUMS
        </h2>
      ) : (
        ""
      )}
      <div className="grid grid-cols-repeatAuto gap-6 m-auto justify-center">
        {albums.length
          ? albums.map(
              (
                album: {
                  id: string;
                  images: { url: string }[];
                  release_date: string;
                  name: string;
                },
                i: number
              ) => {
                return (
                  <button
                    onClick={() => {
                      dispatch(addAlbumId(album.id));
                      Router.push(`/albums/${album.id}`);
                    }}
                    className="cursor-pointer flex flex-col max-w-[200px] items-center"
                    // href={`/albums/${album.id}`}
                    key={i}
                  >
                    {album.images[0] ? (
                      <img
                        className="w-[150px] h-[158px] rounded-xl shadow-md"
                        src={album.images[0].url}
                        alt="album image"
                      />
                    ) : (
                      ""
                    )}
                    <p className="font-semibold">{album.name}</p>
                    <p className="text-gray-400 text-[15px]">
                      {album.release_date.split("-")[0]}
                    </p>
                  </button>
                );
              }
            )
          : ""}
      </div>
    </div>
  );
};

export default ArtistAlbums;
