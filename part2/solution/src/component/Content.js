import Part from "./Part";

function Content({ parts }) {
  return parts.map((part) => (
    <Part key={part.id} name={part.name} number={part.exercises} />
  ));
}

export default Content;
