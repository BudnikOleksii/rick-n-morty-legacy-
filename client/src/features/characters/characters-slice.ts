import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ICharacter } from '../../types/character';

interface CharactersState {
  characters: Maybe<ICharacter[]>;
  charactersInfo: Maybe<IResponseInfo>;
}

const initialState: CharactersState = {
  characters: null,
  charactersInfo: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersLoadingStart: (state, action) => {},
    charactersSuccess: (state, action) => {
      state.characters = action.payload.results;
      state.charactersInfo = action.payload.info;
    },
  },
});

export const { charactersLoadingStart, charactersSuccess } = charactersSlice.actions;

export default charactersSlice.reducer;
