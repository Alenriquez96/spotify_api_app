import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import ArtistInfo from "@/components/ArtistInfo";
import TrackList from "@/components/TrackList";
import SearchBar from "@/components/SearchBar";
import { addRecommendations } from "@/redux/actions/actions";
import RecommendedArtists from "@/components/RecommendedArtists";
import useArtistId from "@/hooks/useArtistId";
import UserDropDown from "@/components/UserDropDown";
import ArtistAlbums from "./ArtistAlbums";
import { artistIdState } from "@/lib/interfaces";
import Player from "@/components/Player";

const Layout = () => {
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const artistId = useSelector(
    (state: artistIdState) => state.artistId.artistId
  );
  const [artistInfo, setArtistInfo]: any = useState({});

  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const fetchArtistInfo = async () => {
    if (artistId.length)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          { headers }
        );
        const data = response.data;
        setArtistInfo(data);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchArtistInfo();
  }, [artistId]);

  return (
    <div className="text-white">
      <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
        <div className="flex items-center w-[100%] justify-evenly">
          <SearchBar />
          <UserDropDown />
        </div>
        <ArtistInfo info={artistInfo} />
      </div>
      <div className="lg:flex lg:items-center ">
        <TrackList />
        <ArtistAlbums />
      </div>
      <RecommendedArtists />
      {/* <Player accessToken={spotifyApi.getAccessToken()} /> */}
    </div>
  );
};

export default Layout;
