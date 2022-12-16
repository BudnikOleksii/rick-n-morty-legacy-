import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
  channelStatus: 'off' | 'on';
  serverStatus: 'off' | 'on' | 'unknown';
}

const initialState: SocketState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startChannel: (state, action) => {},
    stopChannel: () => {},
    channelOn: (state) => {
      state.channelStatus = 'on';
    },
    channelOff: (state) => {
      state.channelStatus = 'off';
      state.serverStatus = 'unknown';
    },
    serverOn: (state) => {
      state.serverStatus = 'on';
    },
    serverOff: (state) => {
      state.serverStatus = 'off';
    },
  },
});

export const { channelOn, channelOff, serverOn, serverOff, startChannel, stopChannel } =
  socketSlice.actions;
export default socketSlice.reducer;
