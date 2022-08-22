import { createSlice } from "@reduxjs/toolkit";
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

const initialState: IHeroesReducerState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
      heroesFetching: (state) => {
        state.heroesLoadingStatus = "loading"
      },
      heroesFetched: (state, action: PayloadAction<IHero[]>) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      },
      heroesFetchingError: (state) => {
        state.heroesLoadingStatus = "error";
      },
      heroesCreate: (state, action: PayloadAction<IHero> ) => {
        state.heroes.push(action.payload);
      },
      heroesDelete: (state, action: PayloadAction<string>) => {
        state.heroes = state.heroes.filter(({id}) => id !== action.payload);
      }
  }
})

const { actions, reducer: heroesReducer } = heroesSlice;

export default heroesReducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
  heroesCreate
} = actions;