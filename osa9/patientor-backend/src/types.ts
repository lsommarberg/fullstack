
export interface Diagnosis {
    name: string;
    code: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
  
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    }
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Other = 'other',
    Female = 'female',
    Male = 'male',
  }


export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;