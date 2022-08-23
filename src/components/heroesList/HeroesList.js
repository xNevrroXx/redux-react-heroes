import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from "@reduxjs/toolkit";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { heroesDelete, fetchHeroes, filteredHeroesSelector } from "../../reduxSlices/heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния - done
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE - done

const HeroesList = () => {
  // const filteredHeroes = useSelector(state => {
  //   console.log("render")
  //   if(state.filters.activeFilter === "all")
  //     return state.heroes.heroes;
  //   else
  //     return state.heroes.heroes.filter(hero => hero.element === state.filters.activeFilter);
  // })
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const {request} = useHttp();
  useEffect(() => {
    dispatch(fetchHeroes())
    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const onDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(data => console.log(data, "DELETED"))
      .then(() => dispatch(heroesDelete(id)))
      .catch(error => console.log(error));
  }

  const setContent = (data) => {
    if (!data || data.length === 0) {
      return (
        <CSSTransition
          unmountOnExit
          key={"error-key"}
          timeout={500}
          classNames="transition-card"
        >
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      )
    }

    return data.map(({id, ...props}) => {
      return (
        <CSSTransition
          key={id}
          timeout={200}
          classNames="transition-card"
        >
          <HeroesListItem onDelete={onDelete} id={id} {...props}/>
        </CSSTransition>
      )
    })
  }

  const elements = setContent(filteredHeroes);
  return (
    <TransitionGroup component="ul">
      {elements}
    </TransitionGroup>
  )
}

export default HeroesList;