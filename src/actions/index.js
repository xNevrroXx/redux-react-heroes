export const fetchHeroes = (request) => (dispatch) => {
  dispatch("HEROES_FETCHING");
  request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}
export const fetchFilters = (request) => (dispatch) => {
  dispatch(filterFetching());
  request("http://localhost:3001/filters")
    .then(filters => dispatch(filterFetched(filters)))
    .catch(filterFetchingError);
}
export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING'
  }
}
export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes
  }
}
export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  }
}

export const filterFetching = () => {
  return {
    type: "FILTER_FETCHING"
  }
}
export const filterFetched = (filters) => {
  return {
    type: "FILTER_FETCHED",
    payload: filters
  }
}
export const filterFetchingError = () => {
  return {
    type: "FILTER_FETCHING_ERROR"
  }
}
export const activeFilterChange = (filter) => {
  return {
    type: "ACTIVE_FILTER_CHANGE",
    payload: filter
  }
}

export const heroCreate = (hero) => {
  return {
    type: "HERO_CREATE",
    payload: hero
  }
}

export const heroDelete = (id) => {
  return {
    type: 'HERO_DELETE',
    payload: id
  }
}

