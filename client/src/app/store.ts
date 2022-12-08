import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import cardsReducer from '../features/cards/cards-slice';
import usersReducer from '../features/users/users-slice';
import setsReducer from '../features/sets/sets-slice';
import charactersReducer from '../features/characters/characters-slice';
import createSagaMiddleware from 'redux-saga';
import IndexSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    users: usersReducer,
    sets: setsReducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(IndexSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
