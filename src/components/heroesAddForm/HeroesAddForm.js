import {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import {object, string,} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

import {fetchFilters, heroCreate} from "../../actions";
import {useHttp} from "../../hooks/http.hook";
// Задача для этого компонента: - DONE
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться - done
// Уникальный идентификатор персонажа можно сгенерировать через uuid - done
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST - done
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе - бессмысленная задача
// данных из фильтров

const validationSchema = object({
  name: string()
    .required("Required")
    .min(2, "Min 2 characters"),
  description: string()
    .required("Required")
    .min(5, "Min 5 characters"),
  element: string()
    .oneOf(["fire", "water", "wind", "earth"], "Required")
});

const HeroesAddForm = () => {
  const heroes = useSelector(state => state.heroes.heroes);
  const filters = useSelector(state => state.filters.filters);
  const dispatch = useDispatch();
  const {request} = useHttp();

  const {handleSubmit, register, reset, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });

  const createNewId = useCallback((allHeroes) => {
    let newId = null;
    let isUnique = true;

    do {
      newId = uuidv4();

      const arrIdUsed = [];
      for (const hero of allHeroes) {
        arrIdUsed.push(hero.id);
      }

      isUnique = !arrIdUsed.includes(newId);
    } while(!isUnique)

    return newId;
  }, [])

  useEffect(() => {
    dispatch(fetchFilters(request));
    // eslint-disable-next-line
  }, [])

  const onSubmit = (data) => {
    const allHeroes = heroes.slice();

    const id = createNewId(allHeroes);
    const newHero = {id: id, ...data};

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then(result => console.log(result))
      .then(() => dispatch(heroCreate(newHero)))
      .catch(error => console.log(error));
    reset();
  }

  const getRuName = (power) => {
    switch (power) {
      case "earth":
        return "земля";
      case "water":
        return "вода";
      case "wind":
        return "ветер";
      case "fire":
        return "огонь";
      default:
        return power;
    }
  }

  const options = filters.map(typeFilter => {
      if(typeFilter !== "all")
        return <option key={typeFilter+"form"} value={typeFilter}>{getRuName(typeFilter)}</option>
      else
        return null;
    }
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          {...register("name")}
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
        {errors.name ? <div className="invalid-feedback d-block">{errors.name.message}</div> : null}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fs-4">Описание</label>
        <textarea
          {...register("description")}
          name="description"
          className="form-control"
          id="description"
          placeholder="Что я умею?"
          style={{"height": '130px'}}
        />
        {errors.description ? <div className="invalid-feedback d-block">{errors.description.message}</div> : null}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          {...register("element")}
          className="form-select"
          id="element"
          name="element"
        >
          <option value="">Я владею элементом...</option>
          {options}
        </select>
        {errors.element ? <div className="invalid-feedback d-block">{errors.element.message}</div> : null}
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;