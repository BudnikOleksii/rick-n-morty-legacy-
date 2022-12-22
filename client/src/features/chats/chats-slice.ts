import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { IChat } from '../../types/chat-messages';

interface ChatsState {
  chats: Maybe<IChat[]>;
  chatsInfo: Maybe<IResponseInfo>;
}

const initialState: ChatsState = {
  chats: null,
  chatsInfo: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatsLoadingStart: (state, action) => {},
    userChatsLoadingStart: (state, action) => {},
    chatsSuccess: (state, action) => {
      state.chats = action.payload.results;
      state.chatsInfo = action.payload.info;
    },
    toggleUserInChatStart: (state, action) => {},
    createChatStart: (state, action) => {},
  },
});

export const {
  chatsLoadingStart,
  userChatsLoadingStart,
  chatsSuccess,
  toggleUserInChatStart,
  createChatStart,
} = chatsSlice.actions;

export default chatsSlice.reducer;
