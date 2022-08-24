import {
  addNotification,
  clearNotification
} from "../store/reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter";
import React from "react";
import { anecdoteVote } from "../store/reducers/anecdoteReducer";

const AnecdoteList = () => {
  const {anecdotes} = useSelector((state) => state.anecdote);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(anecdoteVote(anecdote));
    dispatch(addNotification(`you voted ${anecdote.content}`));

    setTimeout(() => {
      dispatch(clearNotification(null));
    }, 1200);
  };


  

  return (
    <div>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
