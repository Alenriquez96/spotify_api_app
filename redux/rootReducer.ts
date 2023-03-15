import { combineReducers } from "redux";
import artistidReducer from "@/redux/reducers/artistIdReducer";
import artistsTopTracksReducer from "@/redux/reducers/artistsTopTracksReducer";
import albumReducer from "@/redux/reducers/albumReducer";
import searchBarReducer from "@/redux/reducers/searchBarReducer";

const rootReducer = combineReducers({
  artistId: artistidReducer,
  topTracks: artistsTopTracksReducer,
  album: albumReducer,
  searchBar: searchBarReducer,
});

export default rootReducer;
