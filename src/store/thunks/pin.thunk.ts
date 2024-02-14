import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import GalleryService from '../../services/gallery.service';
import { INotify } from '../../interfaces/ui.interface';
import { setNotify, setLoader, setPath } from '../slices/ui.slice';
import errorsService from '../../services/errors.service';
import {
  PinUploadedArrayToPinPreviewArray,
  PinUploadedToPinDetail,
  PixabayArrayToPinPreviewArray,
  PixabayToPinDetail,
} from '../../mappers/pin.mapper';
import { PinUploaded } from '../../interfaces/pin.interface';
import pinRepository from '../../repositories/pin.repository';

export const searchImages = createAsyncThunk(
  'gallery/searchImages',
  async (_, { getState, dispatch }) => {
    try {
      dispatch(setLoader(true));
      const state = getState() as RootState;
      const page = state.gallery.page + 1;
      const response = await GalleryService.getImages(page);
      dispatch(setLoader(false));
      return PixabayArrayToPinPreviewArray(response);
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

export const searchImagesByTag = createAsyncThunk(
  'gallery/searchImagesByTag',
  async (tag: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const page = 1;

      const response = await GalleryService.searchImagesByTag(tag, page);
      dispatch(setLoader(false));
      return PixabayArrayToPinPreviewArray(response);
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

export const scrollImagesByTag = createAsyncThunk(
  'gallery/scrollImagesByTag',
  async (tag: string, { getState, dispatch }) => {
    try {
      dispatch(setLoader(true));
      const state = getState() as RootState;
      const page = state.gallery.pinList.length / GalleryService.PER_PAGE + 1;

      const response = await GalleryService.searchImagesByTag(tag, page);
      dispatch(setLoader(false));
      return PixabayArrayToPinPreviewArray(response);
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

export const searchImageById = createAsyncThunk(
  'gallery/searchImageById',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const response = await GalleryService.getImageDetails(id);
      dispatch(setLoader(false));
      return PixabayToPinDetail(response!);
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

//CUSTOM PINS

export const createNewPost = createAsyncThunk(
  'gallery/createNewPost',
  async (
    {
      file,
      data,
    }: { file: File; data: Omit<PinUploaded, 'id' | 'img' | 'userName' | 'userProfile'> },
    { getState, dispatch },
  ) => {
    try {
      dispatch(setLoader(true));
      const { photoURL, displayName } = (getState() as RootState).auth.user!;
      const dataToUpload: Omit<PinUploaded, 'id' | 'img'> = {
        ...data,
        userProfile: photoURL!,
        userName: displayName!,
      };
      await GalleryService.createNewPin(file, dataToUpload);
      dispatch(setLoader(false));
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

export const updateUsersPin = createAsyncThunk(
  'gallery/updateUsersPin',
  async (
    { pins, showNotification }: { pins: PinUploaded[]; showNotification: boolean },
    { dispatch },
  ) => {
    try {
      if (showNotification) {
        dispatch(
          setNotify({
            content: 'Hay una publicacion nueva',
            severity: 'info',
            title: '',
          }),
        );
      }
      dispatch(setLoader(true));
      const response = PinUploadedArrayToPinPreviewArray(pins);
      dispatch(setLoader(false));
      return response;
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

export const getPinById = createAsyncThunk(
  'gallery/getPinById',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const response = await pinRepository.getDocumentById(id);
      dispatch(setLoader(false));
      return PinUploadedToPinDetail(response!);
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

export const searchPinByTag = createAsyncThunk(
  'gallery/searchPinByTag',
  async (search: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const searchTags = search
        .toLowerCase()
        .split(' ')
        .filter((tag) => tag.trim() !== '')
        .map((tag) => tag.trim());
      let response: PinUploaded[];
      if (searchTags.length) {
        response = await pinRepository.searchDocumentsByString(searchTags);
      } else {
        response = await pinRepository.getAllDocuments();
      }
      dispatch(setLoader(false));
      return PinUploadedArrayToPinPreviewArray(response!);
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
