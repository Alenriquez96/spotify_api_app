import { Types } from "@/redux/types";

interface initialState {
  search: string;
}

const initalState: initialState = {
  search: "album",
};

const reducer = (
  state = initalState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case Types.ADDSEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
