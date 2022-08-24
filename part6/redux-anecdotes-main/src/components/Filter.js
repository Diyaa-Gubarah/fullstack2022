import React from "react";
import { setFilter } from "../store/reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const style = {
  marginVertical: "1em",
};

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const filter = e.target.value;

    dispatch(setFilter(filter));
  };

  return (
    <div style={style}>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
