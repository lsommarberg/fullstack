import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({authors}) => {
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0]?.name || '')

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value)
  }

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log('error', messages)
    },
    refetchQueries: [ {query: ALL_AUTHORS} ],
  })
  
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor, setBornTo: parseInt(born)} })

    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <select value={selectedAuthor} onChange={handleAuthorChange}>
        {authors.map((author) => (
          <option key={author.name} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>
      <form onSubmit={submit}>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm