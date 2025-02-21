import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  requests: { id: number; title: string; budget: string; user: string }[];
}

const initialState: RequestState = {
  requests: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        budget: string;
        user: string;
      }>
    ) => {
      state.requests.push(action.payload);
    },
  },
});

export const { addRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
