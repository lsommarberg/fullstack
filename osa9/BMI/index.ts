import express from 'express';
const app = express();
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res ) => {
  try {
    const { height, weight } = req.query;

    if (!weight || !height) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    const parsedArgs = parseBmiArguments([height as string, weight as string ]);

    const bmiResult = calculateBmi(parsedArgs.height, parsedArgs.weight);

    return res.json({
        height: parsedArgs.height,
        weight: parsedArgs.weight,
        bmi: bmiResult,
    });

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyHours, target } = req.body;
    if (!dailyHours || !target) {
        return res.status(400).send({ error: "parameters missing" });
      }
    const parsedArgs = parseArguments(dailyHours, target);

    const exercisesResult = calculateExercises(parsedArgs.dailyHours, parsedArgs.target);

    return res.json({
        periodLength: exercisesResult.periodLength,
        trainingDays: exercisesResult.trainingDays,
        success: exercisesResult.success,
        rating: exercisesResult.rating,
        ratingDescription: exercisesResult.ratingDescription,
        target: exercisesResult.target,
        average: exercisesResult.average
    });
  
  });


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});