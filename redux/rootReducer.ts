import { combineReducers } from "redux";
import artistidReducer from "@/redux/reducers/artistIdReducer";
import artistsTopTracksReducer from "@/redux/reducers/artistsTopTracksReducer";
import albumReducer from "@/redux/reducers/albumReducer";

const rootReducer = combineReducers({
  artistId: artistidReducer,
  topTracks: artistsTopTracksReducer,
  album: albumReducer,
});

export default rootReducer;
