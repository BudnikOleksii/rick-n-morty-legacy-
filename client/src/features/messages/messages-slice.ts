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
      const prevMessagesIds = new Set();
      prevState.messages.forEach((msg) => {
        prevMessagesIds.add(msg.id);
      });
      const orderedResults = action.payload.results.reverse();
      const newMessages = orderedResults.filter((msg: IMessage) => !prevMessagesIds.has(msg.id));
      const isSameChat = prevState.chat?.id === action.payload.chat.id;

      state.messages = isSameChat ? [...newMessages, ...prevState.messages] : orderedResults;
      state.chat = action.payload.chat;
      state.messagesInfo = action.payload.info;
    },
    createMessageStart: (state, action) => {},
    updateChatInfo: (state, action) => {
      state.chat = action.payload;
    },
    handleMessageReceive: (state, action) => {
      if (action.payload.updated_at || action.payload.deleted_at) {
        state.messages = state.messages.map((msg) =>
          msg.id === action.payload.id ? action.payload : msg
        );
      } else {
        state.messages.push(action.payload);
      }
    },
    editMessageStart: (state, action) => {},
    deleteMessageStart: (state, action) => {},
  },
});

export const {
  messagesLoadingStart,
  messagesSuccess,
  createMessageStart,
  updateChatInfo,
  handleMessageReceive,
  editMessageStart,
  deleteMessageStart,
} = messagesSlice.actions;

export default messagesSlice.reducer;
