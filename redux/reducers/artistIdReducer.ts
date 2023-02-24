import { Types } from "@/redux/types";

interface initialState {
  artistId: string;
  recommendedArtists: [];
}

const initalState: initialState = {
  artistId: "",
  recommendedArtists: [],
};

const reducer = (state = initalState, action: any) => {
  switch (action.type) {
    case Types.ADDARTISTID:
      return {
        ...state,
        artistId: action.payload,
      };
    case Types.ADDRECOMMENDEDARTISTS:
      return {
        ...state,
        recommendedArtists: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
