import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdoteToChange = action.payload
      const updatedAnecdotes = state.map(anecdote =>
        anecdote.id !== anecdoteToChange.id ? anecdote : anecdoteToChange
      )
      const sortedAnecdotes = updatedAnecdotes.sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes   
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
  
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote)
    dispatch(addVote(returnedAnecdote))
  }
}


export default anecdoteSlice.reducer
