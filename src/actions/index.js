// import {createAction} from "@reduxjs/toolkit";
// import {heroesFetched, heroesFetching, heroesFetchingError} from "../reduxSlices/heroesSlice";
// import {filtersFetched, filtersFetching, filtersFetchingError} from "../reduxSlices/filtersSlice";

// export const fetchHeroes = (request) => (dispatch) => {
//   dispatch(heroesFetching());
//   request("http://localhost:3001/heroes")
//     .then(data => {
//       console.log(data);
//       dispatch(heroesFetched(data));
//     })
//     .catch(() => dispatch(heroesFetchingError()))
// }
// export const fetchFilters = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//     .then(filters => dispatch(filtersFetched(filters)))
//     .catch(filtersFetchingError());
// }


// hero actions
//via createAction
// export const heroesFetching = createAction("HEROES_FETCHING");
// export const heroesFetched = createAction("HEROES_FETCHED");
// export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");
// export const heroCreate = createAction("HERO_CREATE");
// export const heroDelete = createAction("HERO_DELETE");

// standard
// export const heroesFetching = () => {
//   return {
//     type: 'HEROES_FETCHING'
//   }
// }
// export const heroesFetched = (heroes) => {
//   return {
//     type: 'HEROES_FETCHED',
//     payload: heroes
//   }
// }
// export const heroCreate = (hero) => {
//   return {
//     type: "HERO_CREATE",
//     payload: hero
//   }
// }
//
// export const heroDelete = (id) => {
//   return {
//     type: 'HERO_DELETE',
//     payload: id
//   }
// }



// filter actions
// standard
// export const filterFetching = () => {
//   return {
//     type: "FILTER_FETCHING"
//   }
// }
// export const filterFetched = (filters) => {
//   return {
//     type: "FILTER_FETCHED",
//     payload: filters
//   }
// }
// export const filterFetchingError = () => {
//   return {
//     type: "FILTER_FETCHING_ERROR"
//   }
// }
// export const activeFilterChange = (filter) => {
//   return {
//     type: "ACTIVE_FILTER_CHANGE",
//     payload: filter
//   }
// }