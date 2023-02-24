import { Types } from "@/redux/types";

interface initialState {
  albumId: string;
}

const initalState: initialState = {
  albumId: "",
};

const reducer = (
  state = initalState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case Types.ADDALBUMID:
      return {
        ...state,
        albumId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
