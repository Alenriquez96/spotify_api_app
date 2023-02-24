import { Types } from "@/redux/types";

interface initialState {
  topTracks: [];
  uriSelected: string;
}

const initalState: initialState = {
  topTracks: [],
  uriSelected: "",
};

const reducer = (state = initalState, action: any) => {
  switch (action.type) {
    case Types.ADDTOPTRACKS:
      return {
        ...state,
        topTracks: [...action.payload],
      };
    case Types.ADDURI:
      return {
        ...state,
        uriSelected: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
