import useSpotify from "@/hooks/useSpotify";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addArtistId, addTopTracks, addSearch } from "@/redux/actions/actions";
import { artistIdState } from "@/lib/interfaces";
import { useRouter } from "next/router";
import UserDropDown from "@/components/UserDropDown";

type Search = string;

type SearchBarState = { searchBar: { search: string } };

const SearchBar = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState<Search>("");
  const [results, setResults]: any = useState({});

  const artistId = useSelector(
    (state: artistIdState) => state.artistId.artistId
  );
  const searchBarState = useSelector(
    (state: SearchBarState) => state.searchBar.search
  );

  const dispatch = useDispatch();

  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const categories: string[] = [
    "album",
    "artist",
    "track",
    "playlist",
    "show ",
  ];

  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          search
        )}&type=${searchBarState}`,
        {
          headers,
        }
      );
      const results = await response.data;

      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length) fetchArtists();
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) setResults([]);
  };

  const chooseCase = () => {
    switch (true) {
      case results.tracks && results.tracks.items.length > 0:
        return results.tracks.items.slice(0, 5).map(
          (
            item: {
              album: { images: { url: string }[] };
              id: string;
              name: string;
            },
            i: number
          ) => {
            let length: number = item.album.images.length - 1;

            return (
              <div
                title={item.name}
                className="bg-[#181818] w-[300px] h-[60px] flex justify-evenly  flex-wrap text-white rounded-[20px] cursor-pointer items-center hover:bg-[#242424] m-1 relative"
                key={i}
                onClick={() => {
                  dispatch(addArtistId(item.id));
                  setResults([]);
                  let input: HTMLInputElement | any =
                    typeof document !== "undefined" &&
                    document.getElementById("searchInput");
                  if (input) input.value = "";
                  router.push(`/tracks/${item.id}`);
                }}
              >
                {item.album.images[length] ? (
                  <img
                    className="rounded-[50%] h-[40px] w-[40px] absolute left-4"
                    src={item.album.images[length].url}
                    alt={item.album.images[length].url}
                  />
                ) : (
                  ""
                )}
                <div className="text-start pl-[90px] min-w-full">
                  <h2 className="font-medium text-[20px] truncate pr-3">
                    {item.name}
                  </h2>
                  <p className="text-[13px] text-gray-400">Song</p>
                </div>
              </div>
            );
          }
        );
      case results.artists && results.artists.items.length > 0:
        return results.artists.items.slice(0, 5).map(
          (
            item: {
              images: { url: string }[];
              id: string;
              name: string;
            },
            i: number
          ) => {
            let length: number = item.images.length - 1;
            return (
              <div
                title={item.name}
                className="bg-[#181818] w-[300px] h-[60px] flex justify-evenly  flex-wrap text-white rounded-[20px] cursor-pointer items-center hover:bg-[#242424] m-1 relative"
                key={i}
                onClick={() => {
                  dispatch(addArtistId(item.id));
                  setResults([]);
                  let input: HTMLInputElement | any =
                    typeof document !== "undefined" &&
                    document.getElementById("searchInput");
                  if (input) input.value = "";
                  router.push(`/artists/${item.id}`);
                  // window.location.href = `/artists/${item.id}`;
                }}
              >
                {item.images[length] ? (
                  <img
                    className="rounded-[50%] h-[40px] w-[40px] absolute left-4"
                    src={item.images[length].url}
                    alt={item.images[length].url}
                  />
                ) : (
                  ""
                )}
                <div className="text-start pl-[95px] min-w-full">
                  <h2 className="font-medium text-[20px] ">{item.name}</h2>
                  <p className="text-[13px] text-gray-400">Artist</p>
                </div>
              </div>
            );
          }
        );
      case results.albums && results.albums.items.length > 0:
        return results.albums.items.slice(0, 5).map(
          (
            item: {
              images: { url: string }[];
              id: string;
              name: string;
            },
            i: number
          ) => {
            let length: number = item.images.length - 1;
            return (
              <div
                title={item.name}
                className="bg-[#181818] w-[300px] h-[60px] flex justify-evenly  flex-wrap text-white rounded-[20px] cursor-pointer items-center hover:bg-[#242424] m-1 relative"
                key={i}
                onClick={() => {
                  dispatch(addArtistId(item.id));
                  setResults([]);
                  let input: HTMLInputElement | any =
                    typeof document !== "undefined" &&
                    document.getElementById("searchInput");
                  if (input) input.value = "";
                  router.push(`/albums/${item.id}`);
                }}
              >
                {item.images[length] ? (
                  <img
                    className="rounded-[50%] h-[40px] w-[40px] absolute left-4"
                    src={item.images[length].url}
                    alt={item.images[length].url}
                  />
                ) : (
                  ""
                )}
                <div className="text-start pl-[95px] min-w-full">
                  <h2 className="font-medium text-[20px] truncate pr-3">
                    {item.name}
                  </h2>
                  <p className="text-[13px] text-gray-400">Album</p>
                </div>
              </div>
            );
          }
        );
      case results.playlists && results.playlists.items.length > 0:
        return results.playlists.items.slice(0, 5).map(
          (
            item: {
              images: { url: string }[];
              id: string;
              name: string;
            },
            i: number
          ) => {
            let length: number = item.images.length - 1;
            return (
              <div
                title={item.name}
                className="bg-[#181818] w-[300px] h-[60px] flex justify-evenly  flex-wrap text-white rounded-[20px] cursor-pointer items-center hover:bg-[#242424] m-1 relative"
                key={i}
                onClick={() => {
                  dispatch(addArtistId(item.id));
                  setResults([]);
                  let input: HTMLInputElement | any =
                    typeof document !== "undefined" &&
                    document.getElementById("searchInput");
                  if (input) input.value = "";
                  router.push(`/playlists/${item.id}`);
                }}
              >
                {item.images[length] ? (
                  <img
                    className="rounded-[50%] h-[40px] w-[40px] absolute left-4"
                    src={item.images[length].url}
                    alt={item.images[length].url}
                  />
                ) : (
                  ""
                )}
                <div className="text-start pl-[95px] min-w-full">
                  <h2 className="font-medium text-[20px] truncate pr-3">
                    {item.name}
                  </h2>
                  <p className="text-[13px] text-gray-400">Playlist</p>
                </div>
              </div>
            );
          }
        );
      case results.shows && results.shows.items.length > 0:
        return results.shows.items.slice(0, 5).map(
          (
            item: {
              images: { url: string }[];
              id: string;
              name: string;
            },
            i: number
          ) => {
            let length: number = item.images.length - 1;
            return (
              <div
                title={item.name}
                className="bg-[#181818] w-[300px] h-[60px] flex justify-evenly  flex-wrap text-white rounded-[20px] cursor-pointer items-center hover:bg-[#242424] m-1 relative"
                key={i}
                onClick={() => {
                  dispatch(addArtistId(item.id));
                  setResults([]);
                  let input: HTMLInputElement | any =
                    typeof document !== "undefined" &&
                    document.getElementById("searchInput");
                  if (input) input.value = "";
                  router.push(`/shows/${item.id}`);
                }}
              >
                {item.images[length] ? (
                  <img
                    className="rounded-[50%] h-[40px] w-[40px] absolute left-4"
                    src={item.images[length].url}
                    alt={item.images[length].url}
                  />
                ) : (
                  ""
                )}
                <div className="text-start pl-[95px] min-w-full">
                  <h2 className="font-medium text-[20px] truncate pr-3">
                    {item.name}
                  </h2>
                  <p className="text-[13px] text-gray-400">Show</p>
                </div>
              </div>
            );
          }
        );
      case results.default:
        break;
    }
  };

  return (
    <div className="flex items-center w-[100%] justify-evenly">
      <div className="my-[20px] flex flex-col items-center flex-wrap">
        <div>
          <div className="relative flex items-center">
            <input
              className="shadow-2xl w-[250px] h-[40px] bg-[#FFFFFF] rounded-l-[55px] text-[#000000] px-14 sm:w-[364px]"
              type="text"
              placeholder="Search artists, songs and playlists"
              id="searchInput"
              onChange={handleChange}
            />
            <select
              value={searchBarState}
              onChange={(e: any) => dispatch(addSearch(e.target.value))}
              className="shadow-2xl h-[40px] bg-[#FFFFFF] rounded-r-[55px] text-[#000000] px-5"
            >
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black "
              className="w-6 h-6 absolute left-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-[364px] absolute top-[75px] bg-transparent">
          {chooseCase()}
        </div>
      </div>
      <UserDropDown />
    </div>
  );
};

export default SearchBar;
