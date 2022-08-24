import { addAnecdote, createAnecdote } from "../store/reducers/anecdoteReducer";
import {
  addNotification,
  clearNotification,
} from "../store/reducers/notificationReducer";

import React from "react";
import anecdoteService from "../services/anecdote";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
  };

  return (
    <div style={{ marginBlock: "2em" }}>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
