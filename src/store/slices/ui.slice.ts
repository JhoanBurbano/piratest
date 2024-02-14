import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INotify } from '../../interfaces/ui.interface';
import { RootState } from '../store';
import { PATHS } from '../../enums/paths.enum';
import {
  thunkSignInWithEmailAndPassword,
  thunkSignInWithGoogle,
  thunkSignOut,
} from '../thunks/auth.thunk';
import { createNewPost } from '../thunks/pin.thunk';

export interface UiState {
  loader: boolean;
  notify?: INotify;
  path?: PATHS;
  modal: boolean;
}

const initialState: UiState = {
  loader: false,
  notify: undefined,
  path: undefined,
  modal: false,
};

export const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setNotify: (state, action: PayloadAction<INotify>) => {
      state.notify = action.payload;
    },
    cleanNotify: (state) => {
      state.notify = undefined;
    },
    setPath: (state, action: PayloadAction<PATHS>) => {
      state.path = action.payload;
    },
    cleanPath: (state) => {
      state.path = undefined;
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    cleanAll: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(thunkSignInWithGoogle.fulfilled, (state) => {
        state.path = PATHS.HOME;
      })
      .addCase(thunkSignInWithEmailAndPassword.fulfilled, (state) => {
        state.path = PATHS.HOME;
      })
      .addCase(thunkSignOut.fulfilled, (state) => {
        state.path = PATHS.LOGIN;
      })
      .addCase(createNewPost.fulfilled, (state) => {
        state.path = PATHS.USERS_POST;
      });
  },
});

export const selectLoader = (state: RootState) => state.ui.loader;
export const selectNotify = (state: RootState) => state.ui.notify;
export const selectPath = (state: RootState) => state.ui.path;
export const selectModal = (state: RootState) => state.ui.modal;

export const { cleanAll, cleanNotify, setLoader, setNotify, setPath, cleanPath, setModal } =
  UiSlice.actions;

export default UiSlice.reducer;
