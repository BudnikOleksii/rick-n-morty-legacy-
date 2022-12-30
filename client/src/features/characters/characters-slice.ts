import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ICharacter, ICharacterBaseInfo } from '../../types/character';

interface CharactersState {
  characters: Maybe<ICharacterBaseInfo[]>;
  charactersInfo: Maybe<IResponseInfo>;
  allCharactersUsed: boolean;
  selectedCharacter: Maybe<ICharacter>;
}

const initialState: CharactersState = {
  characters: null,
  charactersInfo: null,
  allCharactersUsed: false,
  selectedCharacter: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersLoadingStart: (state, action) => {},
    charactersSuccess: (state, action) => {
      state.characters = action.payload.results;
      state.charactersInfo = action.payload.info;
      state.allCharactersUsed = action.payload.unusedCount === 0;
    },
    characterLoadingStart: (state, action) => {},
    characterSuccess: (state, action) => {
      state.selectedCharacter = action.payload;
    },
  },
});

export const {
  charactersLoadingStart,
  charactersSuccess,
  characterLoadingStart,
  characterSuccess,
} = charactersSlice.actions;

export default charactersSlice.reducer;
