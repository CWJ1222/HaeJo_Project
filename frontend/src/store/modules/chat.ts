import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
