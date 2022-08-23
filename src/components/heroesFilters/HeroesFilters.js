import {connect} from "react-redux";
import {useMemo} from "react";
import {filtersActiveChange, selectAll as selectAllFilters} from "../../reduxSlices/filtersSlice";
import {selectAll} from "../../reduxSlices/heroesSlice";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных - done
// Фильтры должны отображать только нужных героев при выборе - done
// Активный фильтр имеет класс active - done
// Изменять json-файл для удобства МОЖНО! - made it cooler
// Представьте, что вы попросили бэкенд-разработчика об этом - idfc

const HeroesFilters = ({heroes, activeFilter, filtersActiveChange}) => {
  const getData = (power) => {
    switch (power) {
      case "earth":
        return {
          ruName: "земля",
          colorBtn: "secondary"
        };
      case "water":
        return {
          ruName: "вода",
          colorBtn: "primary"
        };
      case "wind":
        return {
          ruName: "ветер",
          colorBtn: "success"
        };
      case "fire":
        return {
          ruName: "огонь",
          colorBtn: "danger"
        };
      default:
        return {
          ruName: power,
          colorBtn: "secondary"
        };
    }
  }

  const onChangeFilter = (e) => {
    const targetElem = e.target;
    const filterType = targetElem.getAttribute("data-filter-type");
    filtersActiveChange(filterType)
  }

  const elems = useMemo(() => {
    const uniquePowers = [];
    const allPowers = heroes.map(({element}) => element);

    for (const element of allPowers) {
      if(!uniquePowers.includes(element)) {
        uniquePowers.push(element);
      }
    }
    return uniquePowers.map(element => {
      const data = getData(element);

      return <button
        key={element}
        onClick={onChangeFilter}
        data-filter-type={element}
        className={`btn btn-${data.colorBtn}${activeFilter === element ? " active" : ""}`}
      >
        {data.ruName}
      </button>
    })
    // eslint-disable-next-line
  }, [heroes])

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <button
            onClick={onChangeFilter}
            data-filter-type="all"
            className={`btn btn-outline-dark${activeFilter === "all" ? " active" : ""}`}
          >
            Все
          </button>

          {elems}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  heroes: selectAll(state),
  activeFilter: state.filters.activeFilter
});
const mapDispatchToProps = dispatch => {
  return {
    filtersActiveChange: (filter) => dispatch(filtersActiveChange(filter))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeroesFilters);