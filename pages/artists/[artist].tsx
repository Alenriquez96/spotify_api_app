import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import ArtistInfo from "@/components/ArtistInfo";
import TrackList from "@/components/TrackList";
import SearchBar from "@/components/SearchBar";
import {
  addRecommendations,
  addArtistId,
  addTopTracks,
} from "@/redux/actions/actions";
import RecommendedArtists from "@/components/RecommendedArtists";
import useArtistId from "@/hooks/useArtistId";
import UserDropDown from "@/components/UserDropDown";
import ArtistAlbums from "@/components/ArtistAlbums";
import { artistIdState } from "@/lib/interfaces";
import Player from "@/components/Player";
import { useRouter } from "next/router";

const artist = () => {
  const router = useRouter();

  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const { artist }: any = router.query;

  dispatch(addArtistId(artist));

  const [artistInfo, setArtistInfo]: any = useState({});

  const headers = { Authorization: `Bearer ${spotifyApi.getAccessToken()}` };

  const fetchArtistInfo = async () => {
    if (artist && artist.length)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artist}`,
          { headers }
        );
        const data = response.data;

        setArtistInfo(data);
      } catch (error) {
        console.log(error);
      }
  };

  const fetchArtistTopTracks = async () => {
    if (artist && artist.length)
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artist}/top-tracks?country=ES`,
          { headers }
        );
        const data = response.data;

        dispatch(addTopTracks(data.tracks));
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    fetchArtistInfo();
    fetchArtistTopTracks();
  }, [artist]);

  return (
    <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
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
      <Player />
    </main>
  );
};

export default artist;
