import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import requestsReducer from "./modules/requests";
import bidsReducer from "./modules/bids";
import chatReducer from "./modules/chat";

const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestsReducer,
    bids: bidsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
