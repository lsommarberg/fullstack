import { courseParts } from "../types";

const Part = () => {
const renderPart = (part: typeof courseParts[number]) => {
    switch (part.kind) {
        case "basic":
            return (
                <div key={part.name}>
                    <strong>{part.name}</strong> 
                    <p>{part.exerciseCount} exercises </p> 
                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div key={part.name}>
                    <strong>{part.name}</strong> <p>{part.exerciseCount} exercises</p> 
                    <p>group projects: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div key={part.name}>
                    <strong>{part.name}</strong> 
                    <p>{part.exerciseCount} exercises </p>
                    <p>{part.description}</p>
                    <p>background: {part.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div key={part.name}>
                    <strong>{part.name}</strong> 
                    <p>{part.exerciseCount} exercises</p> 
                    <p>{part.description}</p>
                    <p>requirements: {part.requirements.join(", ")}</p>
                </div>
            );
        default:
            return null;
    }
};

  return (
    <div>
      {courseParts.map(part => renderPart(part))}
    </div>
  );
};

export default Part;
