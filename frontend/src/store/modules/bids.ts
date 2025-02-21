import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bid {
  id: number;
  requestId: number;
  amount: number;
  user: string;
}

interface BidState {
  bids: Bid[];
}

const initialState: BidState = {
  bids: [],
};

const bidsSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    addBid: (state, action: PayloadAction<Bid>) => {
      state.bids.push(action.payload);
    },
  },
});

export const { addBid } = bidsSlice.actions;
export default bidsSlice.reducer;
