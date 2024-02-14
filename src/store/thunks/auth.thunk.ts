import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import { UserData } from '../../interfaces/user.interface';
import { setLoader, setNotify, setPath } from '../slices/ui.slice';
import errorsService from '../../services/errors.service';
import { INotify } from '../../interfaces/ui.interface';

export const thunkSignInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await AuthService.signInWithGoogle();
      dispatch(setLoader(false));
      return { user };
    } catch (error) {
      const { notify: notifyPayload, path: pathToRedirect } =
        errorsService.handleGeneralError(error);
      dispatch(setNotify(notifyPayload as INotify));
      dispatch(setLoader(false));
      if (pathToRedirect) {
        dispatch(setPath(pathToRedirect));
      }
    }
  },
);

export const thunkSignOut = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    await AuthService.signOut();
    dispatch(setLoader(false));
  } catch (error) {
    dispatch(setLoader(false));
  }
});

export const thunkSignUpWithEmailAndPassword = createAsyncThunk(
  'auth/signUpWithEmailAndPassword',
  async (
    { email, password, username }: { email: string; password: string; username: string },
    { dispatch },
  ) => {
    try {
      dispatch(setLoader(true));
      await AuthService.signUpWithEmailAndPassword(email, password, username);
      dispatch(setLoader(false));
      dispatch(
        setNotify({
          title: 'success',
          content: 'User has been registered succesfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      const { notify: notifyPayload, path: pathToRedirect } =
        errorsService.handleGeneralError(error);
      dispatch(setNotify(notifyPayload as INotify));
      dispatch(setLoader(false));
      if (pathToRedirect) {
        dispatch(setPath(pathToRedirect));
      }
    }
  },
);

export const thunkSignInWithEmailAndPassword = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async ({ email, password }: UserData, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await AuthService._signInWithEmailAndPassword(email, password);
      dispatch(setLoader(false));
      if (!user) {
        throw Error('Credenciales invalidas');
      }
      return user;
    } catch (error) {
      const { notify: notifyPayload, path: pathToRedirect } =
        errorsService.handleGeneralError(error);
      dispatch(setNotify(notifyPayload as INotify));
      dispatch(setLoader(false));
      if (pathToRedirect) {
        dispatch(setPath(pathToRedirect));
      }
    }
  },
);
