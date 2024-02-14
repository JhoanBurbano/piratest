import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PinDetail, PinPreview } from '../../interfaces/pin.interface';
import {
  getPinById,
  scrollImagesByTag,
  searchImageById,
  searchImages,
  searchImagesByTag,
  searchPinByTag,
  updateUsersPin,
} from '../thunks/pin.thunk';

export interface GalleryState {
  pin?: PinDetail;
  pinList: Array<PinPreview>;
  page: number;
  search: string;
}

const initialState: GalleryState = {
  pin: undefined,
  pinList: [],
  page: 0,
  search: '',
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    cleanPage: (state) => {
      state.page = 0;
    },
    cleanSearch: (state) => {
      state.search = '';
    },
    cleanPin: (state) => {
      state.pin = undefined;
    },
    cleanAll: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchImages.fulfilled, (state, { payload }) => {
        state.pinList.push(...payload!);
        state.page += 1;
      })
      .addCase(searchImagesByTag.fulfilled, (state, { payload }) => {
        state.pinList = payload!;
      })
      .addCase(scrollImagesByTag.fulfilled, (state, { payload }) => {
        state.pinList.push(...payload!);
        state.page += 1;
      })
      .addCase(searchImageById.fulfilled, (state, { payload }) => {
        state.pin = payload;
      })
      .addCase(updateUsersPin.fulfilled, (state, { payload }) => {
        state.pinList = payload!;
      })
      .addCase(getPinById.fulfilled, (state, { payload }) => {
        state.pin = payload;
      })
      .addCase(searchPinByTag.fulfilled, (state, { payload }) => {
        state.pinList = payload!;
      });
  },
});

export const selectPin = (state: RootState) => state.gallery.pin;
export const selectPage = (state: RootState) => state.gallery.page;
export const selectPinList = (state: RootState) => state.gallery.pinList;
export const selectSearch = (state: RootState) => state.gallery.search;

export const { cleanAll, cleanPage, cleanPin, incrementPage } = GallerySlice.actions;

export default GallerySlice.reducer;
