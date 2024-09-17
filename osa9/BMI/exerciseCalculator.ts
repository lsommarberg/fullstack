import { isNotNumber } from "./utils";

export interface ExerciseCalculatorResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const parseArguments = (values: string[], targetValue:string ) => {

    for (let i = 1; i < values.length; i++) {
        const arg = values[i];
        if (isNotNumber(arg)) {
            throw new Error("malformatted parameters");
        }
    }
    if (isNotNumber(targetValue)) {
        throw new Error("malformatted parameters");
    }

    const dailyHours = values.map(arg => Number(arg));

    return {
        dailyHours: dailyHours,
        target: Number(targetValue)
    };
};

export const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseCalculatorResult => {
    let trainingDays = 0;
    const periodLength = dailyHours.length;
    const average = dailyHours.reduce((acc, val) => acc + val, 0) / periodLength
    let success = false;
    let targetReached = 0;
    let rating = 0;
    let ratingDescription = '';

    dailyHours.forEach(hours => {
        if (hours > 0) {
            trainingDays++;
        }
        if (hours >= target) {
            targetReached++;
        }
    });

    if ((targetReached / trainingDays) >= 0.9) {
        success = true;
        rating = 3;
        ratingDescription = 'Well done';
    } else if ((targetReached / trainingDays) >= 0.5) {
        success = false;
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        success = false;
        rating = 1;
        ratingDescription = 'you can do better';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

if (require.main === module) {
    try {
        const values = process.argv.slice(2, -1);
        const targetValue = process.argv.slice(-1)[0];
        const { dailyHours, target } = parseArguments(values, targetValue);
        console.log(calculateExercises(dailyHours, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
