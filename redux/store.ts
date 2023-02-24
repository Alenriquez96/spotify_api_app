import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "@/redux/rootReducer";

const makeStore = () => {
  return createStore(rootReducer, {}, composeWithDevTools());
};

export const wrapper = createWrapper(makeStore);
