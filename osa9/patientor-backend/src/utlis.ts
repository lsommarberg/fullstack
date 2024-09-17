import { NewPatient, Gender, HealthCheckEntry } from './types';
import { z } from 'zod';


const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  entries: z.array(
    z.object({
      type: z.string(),
      healthCheckRating: z.number(),
      id: z.string(),
      description: z.string(),
      date: z.string().date(),
      specialist: z.string(),
    }).refine((val) => val.type === 'HealthCheck', {
      message: 'Invalid entry type',
      path: ['entries'],
    }) as z.ZodType<HealthCheckEntry>
  ),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};