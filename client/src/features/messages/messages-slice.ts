import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { IChat, IMessage } from '../../types/chat-messages';

interface ChatsState {
  chat: Maybe<IChat>;
  messages: Maybe<IMessage[]>;
  messagesInfo: Maybe<IResponseInfo>;
}

const initialState: ChatsState = {
  chat: null,
  messages: null,
  messagesInfo: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesLoadingStart: (state, action) => {},
    messagesSuccess: (state, action) => {
      state.chat = action.payload.chat;
      state.messages = action.payload.results;
      state.messagesInfo = action.payload.info;
    },
  },
});

export const { messagesLoadingStart, messagesSuccess } = messagesSlice.actions;

export default messagesSlice.reducer;
