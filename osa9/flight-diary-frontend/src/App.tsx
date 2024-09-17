import { useState, useEffect, SyntheticEvent } from 'react'
import diaryService from './services/diaries'
import { DiaryEntry, Visibility, Weather, NewDiaryEntry } from './types'
import { AxiosError } from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    diaryService.getAll().then((diaries) => setDiaries(diaries))
  }, [])

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    };
    try {
      const addedDiary = await diaryService.create(diaryToAdd);
      setDiaries(diaries.concat(addedDiary));
      setDate('');
      setComment('');
      setVisibility('');
      setWeather('');
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Error adding diary:', error);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };


  return (
        <div>
          <h1>Flight Diary</h1>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <h2>Add a new diary entry</h2>
          <form onSubmit={addDiary}>
          <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
          <div>
          <label>visibility:</label>
            {Object.values(Visibility).map((v) => (
              <label key={v} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={() => setVisibility(v)}
                />
                {v}
              </label>
            ))}
          </div>
          </div>
            
          <div>
            <label>weather:</label>
            {Object.values(Weather).map((w) => (
              <label key={w} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="weather"
                  value={w}
                  checked={weather === w}
                  onChange={() => setWeather(w)}
                />
                {w}
              </label>
            ))}
          </div>
          <div>
            <label>comment:</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
        <h2>Diaries</h2>
          <ul>
            {diaries.map((diary) => (
              <li key={diary.id}>
                <strong>{diary.date}</strong>  
                <p>visibility: {diary.visibility}</p>
                <p>weather: {diary.weather}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    }

export default App;
