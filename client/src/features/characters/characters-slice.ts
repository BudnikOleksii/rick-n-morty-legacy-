import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ICharacter } from '../../types/character';

interface CharactersState {
  characters: Maybe<ICharacter[]>;
  charactersInfo: Maybe<IResponseInfo>;
  charactersIsloading: boolean;
  charactersErrors: Maybe<string[]>;
}

const initialState: CharactersState = {
  characters: null,
  charactersInfo: null,
  charactersIsloading: false,
  charactersErrors: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersLoadingStart: (state, action) => {
      state.charactersIsloading = true;
      state.charactersErrors = null;
    },
    charactersSuccess: (state, action) => {
      state.charactersIsloading = false;
      state.characters = action.payload.results;
      state.charactersInfo = action.payload.info;
    },
    charactersError: (state, action) => {
      state.charactersIsloading = false;
      state.charactersErrors = action.payload;
    },
    charactersRemoveErrors: (state) => {
      state.charactersErrors = null;
    },
  },
});

export const {
  charactersLoadingStart,
  charactersSuccess,
  charactersError,
  charactersRemoveErrors,
} = charactersSlice.actions;

export default charactersSlice.reducer;
