import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
  messages: any[];
  channelStatus: 'off' | 'on';
  serverStatus: 'off' | 'on' | 'unknown';
}

const initialState: SocketState = {
  messages: [],
  channelStatus: 'off',
  serverStatus: 'unknown',
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startChannel: () => {},
    stopChannel: () => {},
    channelOn: (state) => {
      state.channelStatus = 'on';
    },
    channelOff: (state) => {
      state.channelStatus = 'off';
      state.serverStatus = 'unknown';
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    serverOn: (state) => {
      state.serverStatus = 'on';
    },
    serverOff: (state) => {
      state.serverStatus = 'off';
    },
  },
});

export const { channelOn, channelOff, addMessage, serverOn, serverOff, startChannel, stopChannel } =
  socketSlice.actions;
export default socketSlice.reducer;
