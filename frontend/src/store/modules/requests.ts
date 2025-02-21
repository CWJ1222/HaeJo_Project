import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  requests: {
    id: number;
    title: string;
    budget: number;
    User?: { nickname: string };
  }[];
}

const initialState: RequestState = {
  requests: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (
      state,
      action: PayloadAction<
        {
          id: number;
          title: string;
          budget: number;
          User?: { nickname: string };
        }[]
      >
    ) => {
      state.requests = action.payload;
    },
  },
});

export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
