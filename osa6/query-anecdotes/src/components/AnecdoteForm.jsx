import { useMutation, useQueryClient  } from '@tanstack/react-query'

import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const tooShort = () => {
    dispatch({ type: 'TOO_SHORT'})
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: tooShort,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })    
    },
  })


  const onCreate = (event) => {
    
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'ADD', payload: { content: content} })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
