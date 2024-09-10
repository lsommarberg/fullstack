import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from 'react';

const Books = () => {
  
  const [selectedGenre, setSelectedGenre] = useState(null)
  const resultBooks = useQuery(ALL_BOOKS)

  const resultGenres = useQuery(ALL_GENRES)

  if (resultBooks.loading || resultGenres.loading ) {
    return <div>loading...</div>
  }
  
  const books = resultBooks.data.allBooks
  const genres = resultGenres.data.allGenres

  const selectGenre = (genre) => {
    setSelectedGenre(genre)
    resultBooks.refetch({ genre })
  }


  return (
    <div>
      <h2>books</h2>
        {selectedGenre && <h3>In genre: {selectedGenre}</h3>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button onClick={() => {
          setSelectedGenre(null)
          resultBooks.refetch({ genre: null })
        }}>all genres</button>

        {genres.map((genre) => (
          <button key={genre} onClick={() => selectGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
