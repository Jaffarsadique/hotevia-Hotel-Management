import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/hotelApi";

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", () => api.getHotels());
export const addHotel = createAsyncThunk("hotels/addHotel", (hotel) => api.createHotel(hotel));
export const updateHotel = createAsyncThunk("hotels/updateHotel", (hotel) => api.editHotel(hotel));
export const deleteHotel = createAsyncThunk("hotels/deleteHotel", async (id) => {
  await api.removeHotel(id);
  return id;
});

const initialState = {
  list: [],
  status: "idle", // idle | loading | done | failed
  error: "",
  search: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "best",
  viewMode: "list",
  currentPage: 1,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setPriceFilter(state, action) {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.currentPage = 1;
    },
    resetFilters(state) {
      state.search = "";
      state.minPrice = "";
      state.maxPrice = "";
      state.currentPage = 1;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "done";
        state.list = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.list.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.list = state.list.filter((h) => h.id !== action.payload);
      });
  },
});

export const {
  setSearch,
  setPriceFilter,
  resetFilters,
  setSortBy,
  setViewMode,
  setCurrentPage,
} = hotelSlice.actions;

export default hotelSlice.reducer;
