import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  thunkSignInWithGoogle,
  thunkSignOut,
  thunkSignInWithEmailAndPassword,
} from '../thunks/auth.thunk';
import { user } from '../../interfaces/user.interface';

export interface AuthState {
  user: user | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkSignInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload!.user;
      })
      .addCase(thunkSignOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(thunkSignInWithEmailAndPassword.fulfilled, (state, action) => {
        state.user = action.payload!;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
