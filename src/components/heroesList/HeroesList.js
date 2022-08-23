import {useCallback, useMemo} from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {useDeleteHeroMutation, useGetHeroesQuery} from "../../api/apiSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния - done
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE - done

const HeroesList = () => {
  const {
    data: heroes = [],
    isLoading,
    isFetching,
    isError,
  } = useGetHeroesQuery();
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector(state => state.filters.activeFilter);
  const filteredHeroes = useMemo(() => {
    if(activeFilter === "all")
      return heroes;
    else
      return heroes.filter((hero) => hero.element === activeFilter);
  }, [heroes, activeFilter])

  const onDelete = useCallback((id) => {
    deleteHero(id);
  }, [])

  if (isLoading || isFetching) {
    return <Spinner/>;
  } else if (isError) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
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