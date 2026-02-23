const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// NEW: Total component to calculate the sum
const Total = ({ parts }) => {
  const totalAmount = parts.reduce((sum, part) => {
    // This will print to your browser console for every item in the array
    console.log("what is happening", sum, part);
    return sum + part.exercises;
  }, 0);

  return <strong>total of {totalAmount} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10, id: 1 },
      { name: "Using props to pass data", exercises: 7, id: 2 },
      { name: "State of a component", exercises: 14, id: 3 },
      { name: "Redux", exercises: 11, id: 4 },
    ],
  };

  return <Course course={course} />;
};

export default App;
