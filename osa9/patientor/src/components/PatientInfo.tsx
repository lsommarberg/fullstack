import React, { useEffect, useState } from 'react';
import { Patient, Diagnosis } from '../types';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';
import { useParams } from 'react-router-dom';

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const fetchedPatient = await patientService.getById(id);
          setPatient(fetchedPatient);
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const fetchedDiagnoses = await diagnosisService.getAll();
        setDiagnoses(fetchedDiagnoses);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  if (loading || !patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h3>Entries:</h3>
      {patient.entries.length > 0 ? (
        <ul>
          {patient.entries.map((entry) => (
            <li key={entry.id}>
              <p>{entry.date} {entry.description}</p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {getDiagnosisName(code)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries available.</p>
      )}
    </div>
  );
};

export default PatientInfo;
