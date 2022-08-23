import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { PayloadAction } from "@reduxjs/toolkit";


interface IHero {
  id: string,
  name: string,
  description: string
  element: "fire" | "water" | "wind" | "earth"
}
interface IHeroesReducerState {
  heroes: IHero[],
  heroesLoadingStatus: "idle" | "loading" | "error"
}

// const initialState: IHeroesReducerState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle'
// }

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle"
});
export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  (dispatch) => {
    const { request } = useHttp();
    return request("http://localhost:3001/heroes")
  }
)

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
      heroesCreate: (state, action: PayloadAction<IHero> ) => {
        heroesAdapter.addOne(state, action.payload);
      },
      heroesDelete: (state, action: PayloadAction<string>) => {
        console.log()
        // state.heroes = state.heroes.filter(({id}) => id !== action.payload);
        heroesAdapter.removeOne(state, action.payload);
      }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading"
      })
      .addCase(fetchHeroes.fulfilled, (state, action: PayloadAction<IHero[]>) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
  }
})

const { actions, reducer } = heroesSlice;

export default reducer;
export const {selectAll} = heroesAdapter.getSelectors((state: any) => state.heroes);
export const filteredHeroesSelector = createSelector(
  (state: any) => state.filters.activeFilter,
  selectAll,
  (activeFilter, heroes) => {
    if(activeFilter === "all")
      return heroes;
    else
      return heroes.filter((hero: any) => hero.element === activeFilter);
  }
)

export const {
  heroesDelete,
  heroesCreate
} = actions;