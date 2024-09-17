import patients from "../../data/patients";

import { Patient, NonSensitivePatientInfo, NewPatient } from "../types";

import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };


const addPatient = ( addedPatient: NewPatient ): Patient => {
  const id = uuid();

  const newPatient = {
    id: id,

    ...addedPatient
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
    getPatients,
    getNonSensitivePatientInfo,
    addPatient,
    findById
};

