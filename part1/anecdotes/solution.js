import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const p = [0, 0, 0, 0, 0, 0, 0];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(p);

  const getNextAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const increasePointsByOne = () => {
    const copy = [...points];

    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Display anecdotes={anecdotes[selected]} points={points[selected]} />
      <button onClick={increasePointsByOne}>vote</button>
      <button onClick={getNextAnecdotes}>Next anecdote</button>
      <br />
      {points?.some((p) => p > 0) && (
        <>
          <h1>Anecdote with most votes</h1>

          <Display
            anecdotes={anecdotes[points.indexOf(Math.max(...points))]}
            points={Math.max(...points)}
          />
        </>
      )}
    </>
  );
};

export default App;

function Display({ anecdotes, points }) {
  return (
    <div>
      <p>{anecdotes}</p>
      <h5>has {points} vote</h5>
    </div>
  );
}
