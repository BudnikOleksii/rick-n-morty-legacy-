import { createSlice, current } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { IChat, IMessage } from '../../types/chat-messages';

interface ChatsState {
  chat: Maybe<IChat>;
  messages: IMessage[];
  messagesInfo: Maybe<IResponseInfo>;
}

const initialState: ChatsState = {
  chat: null,
  messages: [],
  messagesInfo: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesLoadingStart: (state, action) => {},
    messagesSuccess: (state, action) => {
      const prevState = current(state);
      const previousMessagesIds = new Set();
      prevState.messages.forEach((msg) => {
        previousMessagesIds.add(msg.id);
      });
      const newMessages = action.payload.results.filter(
        (msg: IMessage) => !previousMessagesIds.has(msg.id)
      );

      if (prevState.chat?.id === action.payload.chat.id) {
        state.messages.push(...newMessages);
      } else {
        state.messages = action.payload.results;
      }

      state.chat = action.payload.chat;
      state.messagesInfo = action.payload.info;
    },
    createMessageStart: (state, action) => {},
    updateChatInfo: (state, action) => {
      state.chat = action.payload;
    },
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  messagesLoadingStart,
  messagesSuccess,
  createMessageStart,
  updateChatInfo,
  addNewMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
