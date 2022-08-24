import { applyMiddleware, combineReducers, createStore } from "redux";

import noteReducer from "./reducers/note";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  note: noteReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const persistor = persistStore(store);
