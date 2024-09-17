import { courseParts } from "./types";
import Part from "./components/Part";

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <Part />
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;