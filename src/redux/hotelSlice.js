import { createSlice } from "@reduxjs/toolkit";
import dummyHotels from "../data/hotels";

const initialState = {
  list: dummyHotels,
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
    addHotel(state, action) {
      const newHotel = { ...action.payload, id: Date.now().toString() };
      state.list.unshift(newHotel);
    },
    updateHotel(state, action) {
      const index = state.list.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteHotel(state, action) {
      state.list = state.list.filter((h) => h.id !== action.payload);
    },
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
});

export const {
  addHotel,
  updateHotel,
  deleteHotel,
  setSearch,
  setPriceFilter,
  resetFilters,
  setSortBy,
  setViewMode,
  setCurrentPage,
} = hotelSlice.actions;

export default hotelSlice.reducer;
