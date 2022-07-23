import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good + bad + neutral) / 3).toFixed(2);
  const positive = ((good / total) * 100).toFixed(2);

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <h1>Statistics</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>
              <h4 style={{ display: "inline" }}>total</h4>
            </td>
            <td>
              <h4>{total}</h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4 style={{ display: "inline" }}>average</h4>
            </td>
            <td>
              <h4>{average}</h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4 style={{ display: "inline" }}>positive</h4>
            </td>
            <td>
              <h4>{positive}%</h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
