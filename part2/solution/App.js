import { COURSES } from "./data/courses";
import Course from "./components/Course";
import React from "react";

const App = () => {
  return (
    <div>
      <Course course={COURSES[0]} />
      <Course course={COURSES[1]} />
    </div>
  );
};

export default App;
