import { isNotNumber } from "./utils";

export const parseBmiArguments = (args: string[]) => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');
  
  const [heightArg, weightArg] = args;
  
  if (!isNotNumber(heightArg) && !isNotNumber(weightArg)) {
    return {
      height: Number(heightArg),
      weight: Number(weightArg)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

if (require.main === module) {
  try {
    const args = process.argv.slice(2)
    const {  height, weight } = parseBmiArguments(args);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

