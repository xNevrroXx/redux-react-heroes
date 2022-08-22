import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IFiltersReducerState {
  filters: string[],
  filterLoadingStatus: "idle" | "loading" | "error",
  activeFilter: string

}

const initialState: IFiltersReducerState = {
  filters: [],
  filterLoadingStatus: "idle",
  activeFilter: "all"
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filterLoadingStatus = "loading";
    },
    filtersFetched: (state, action: PayloadAction<string[]>) => {
      state.filterLoadingStatus = "idle";
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filterLoadingStatus = "error";
    },
    filtersActiveChange: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    }
  }
})

const {actions, reducer: filtersReducer} = filtersSlice;

export default filtersReducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersActiveChange
} = actions;