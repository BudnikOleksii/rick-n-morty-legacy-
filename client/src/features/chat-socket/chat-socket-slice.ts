import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
  isOnline: boolean;
  serverStatus: 'off' | 'on' | 'unknown';
  usersInRoomIds: number[];
}

const initialState: SocketState = {
  isOnline: false,
  serverStatus: 'unknown',
  usersInRoomIds: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startChannel: (state, action) => {},
    stopChannel: () => {},
    channelOn: (state) => {
      state.isOnline = true;
    },
    channelOff: (state) => {
      state.isOnline = false;
      state.serverStatus = 'unknown';
    },
    serverOn: (state) => {
      state.serverStatus = 'on';
    },
    serverOff: (state) => {
      state.serverStatus = 'off';
    },
    setUsersInRoomIds: (state, action) => {
      state.usersInRoomIds = action.payload;
    },
  },
});

export const {
  channelOn,
  channelOff,
  serverOn,
  serverOff,
  startChannel,
  stopChannel,
  setUsersInRoomIds,
} = socketSlice.actions;
export default socketSlice.reducer;
