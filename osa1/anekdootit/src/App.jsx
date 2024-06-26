import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const headline1 = "Anecdote of the day"
  const headline2 = "Anecdote with most votes"
   
  const [selected, setSelected] = useState(0)
  const randomInt = Math.floor(Math.random() * 8)
  
  const [points, setPoints] = useState(Array(8).fill(0))

  console.log(points)


  const maxValue = Math.max(...points)
  const maxIndex = points.indexOf(maxValue)

  const setVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <div>
      <h1>{headline1}</h1>

      {anecdotes[selected]}
      <div>Has {points[selected]} votes</div>
      </div>
      <button onClick={setVote}>
        vote
      </button>
      <button onClick={() => setSelected(randomInt)}>
        next anecdote
      </button>
      <h1>{headline2}</h1>
      {anecdotes[maxIndex]}

      <div>Has {points[maxIndex]} votes</div>

    </div>
    )

  }


export default App