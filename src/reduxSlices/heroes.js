import {createReducer} from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreate,
  heroDelete
} from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
  builder
    .addCase(heroesFetching, state => {
      state.heroesLoadingStatus = "loading";
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingState = "idle";
    })
    .addCase(heroesFetchingError, state => {
      state.heroesLoadingStatus = "error";
    })
    .addCase(heroCreate, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addCase(heroDelete, (state, action) => {
      state.heroes = state.heroes.filter(({id}) => id !== action.payload);
    })
    .addDefaultCase(() => {})
})

// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case 'HEROES_FETCHING':
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading'
//       }
//     case 'HEROES_FETCHED':
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle'
//       }
//     case 'HEROES_FETCHING_ERROR':
//       return {
//         ...state,
//         heroesLoadingStatus: 'error'
//       }
//     case 'HERO_DELETE':
//       return {
//         ...state,
//         heroes: state.heroes.filter(({id}) => id !== action.payload)
//       }
//     case "HERO_CREATE":
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload]
//       }
//     default: return state
//   }
// }

export default heroes;