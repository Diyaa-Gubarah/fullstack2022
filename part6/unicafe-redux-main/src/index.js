import {
  badAction,
  goodAction,
  okAction,
  resetAction,
} from "../src/store/actions/note";
import { useDispatch, useSelector } from "react-redux";

import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "../src/store/store";

const App = () => {
  const dispatch = useDispatch();
  const { good, bad, ok } = useSelector((state) => state.note);

  const handleGood = () => {
    dispatch(goodAction());
  };

  const handleBad = () => {
    dispatch(badAction());
  };

  const handleOk = () => {
    dispatch(okAction());
  };

  const handleReset = () => {
    dispatch(resetAction());
  };
  

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

renderApp();
