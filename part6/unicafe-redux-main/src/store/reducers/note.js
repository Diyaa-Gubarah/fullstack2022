import { BAD, GOOD, OK, RESET } from "../actions/note";

const initialState = {
  bad: 0,
  good: 0,
  ok: 0,
};

function noteReducer(state = initialState, action) {
  switch (action.type) {
    case BAD:
      return {
        ...state,
        bad: state.bad + 1,
      };
    case GOOD:
      return {
        ...state,
        good: state.good + 1,
      };
    case OK:
      return {
        ...state,
        ok: state.ok + 1,
      };
    case RESET:
      return {
        ...state,
        bad: 0,
        good: 0,
        ok: 0,
      };

    default:
      return state;
  }
}

export default noteReducer;
