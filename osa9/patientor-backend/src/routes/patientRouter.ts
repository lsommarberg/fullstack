import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientInfo } from '../types';
import {toNewPatient }  from '../utlis';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
    res.send(patientService.getNonSensitivePatientInfo());
  });



router.post('/', (req, res) => {
  try {

    const newPatient = toNewPatient(req.body);


    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
