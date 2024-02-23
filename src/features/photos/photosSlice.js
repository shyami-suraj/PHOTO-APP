import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (params, thunkAPI) => {
    const { albumId, searchTerm, currentPage } = params;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_page=${currentPage}&_limit=10&q=${searchTerm}`
    );
    const data = await response.json();
    return { photos: data, currentPage };
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    albumId: null,
    searchTerm: '',
    currentPage: 1,
    totalPages: 0,
  },
  reducers: {
    setAlbumId: (state, action) => {
      state.albumId = action.payload;
      state.currentPage = 1; // reset the current page to 1 when the albumId changes
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // reset the current page to 1 when the searchTerm changes
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        // handle pending state here if needed
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload.photos;
        state.currentPage = action.payload.currentPage;
        state.totalPages = Math.ceil(action.payload.photos.length / 10);
      })
      .addCase(fetchPhotos.rejected, (state) => {
        // handle rejected state here if needed
      });
  },
});

export const { setAlbumId, setSearchTerm, changePage } = photosSlice.actions;
export default photosSlice.reducer;