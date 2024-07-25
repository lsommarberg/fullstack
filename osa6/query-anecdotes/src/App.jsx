import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'


const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  
  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
    dispatch({ type: 'VOTE', payload: { content: anecdote.content} })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App



