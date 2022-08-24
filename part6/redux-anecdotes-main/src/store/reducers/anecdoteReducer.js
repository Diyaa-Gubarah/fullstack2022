import anecdoteService from "../../services/anecdote";
import { createSlice } from "@reduxjs/toolkit";
import { orderByVote } from "../../helper/list_helper";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: { anecdotes: [], fanecdotes: [] },
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = action.payload;
      return {
        ...state,
        anecdotes: [...state.anecdotes, newAnecdote],
      };
    },
    addAnecdoteVote(state, action) {
      const id = action.payload;
      const anecdote = state.anecdotes.find((anecdote) => anecdote.id === id);
      const filtered = state.anecdotes.filter((anecdote) => anecdote.id !== id);

      return {
        ...state,
        anecdotes: orderByVote([
          ...filtered,
          {
            ...anecdote,
            votes: anecdote.votes + 1,
          },
        ]),
      };
    },
    initAnecdotes(state, action) {
      return {
        anecdotes: action.payload,
        fanecdotes: action.payload,
      };
    },
    setFilter(state, action = { payload: "" }) {
      const filter = action.payload;

      if (filter === "") {
        return {
          ...state,
          anecdotes: state.fanecdotes,
        };
      } else {
        return {
          ...state,
          anecdotes: state.fanecdotes.filter((anecdote) =>
            anecdote.content.includes(filter)
          ),
        };
      }
    },
  },
});

export const { addAnecdote, addAnecdoteVote, initAnecdotes, setFilter } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// fetch anecdotes from the server using redux-thunk
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(initAnecdotes(anecdotes));
  };
};

// add anecdote to the server using redux-thunk
export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(addAnecdote(newAnecdote));
  };
};


// add anecdote vote to the server using redux-thunk
export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update( anecdote);
    dispatch(addAnecdoteVote(updated.id));
  }
}