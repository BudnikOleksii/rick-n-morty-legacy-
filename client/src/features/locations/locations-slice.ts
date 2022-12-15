import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from '../../types/location';

interface CharactersState {
  locations: ILocation[];
}

const initialState: CharactersState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    locationsLoadingStart: (state) => {},
    locationsSuccess: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const { locationsLoadingStart, locationsSuccess } = locationsSlice.actions;

export default locationsSlice.reducer;
