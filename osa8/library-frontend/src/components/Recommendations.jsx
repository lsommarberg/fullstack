import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from "../queries";
import { useState, useEffect } from 'react';

const Recommendations = () => {
    
    const resultUser = useQuery(CURRENT_USER)

    const loadingUser = resultUser.loading;
    const user = resultUser.data ? resultUser.data.me : null
    const favoriteGenre = user ? user.favoriteGenre : null

    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre,
    });

    if (loadingUser || resultBooks.loading) {
        return <div>loading...</div>;
    }

    const books = resultBooks.data ? resultBooks.data.allBooks : []

  return (
    <div>
      <h2>Recommendations</h2>
      {favoriteGenre && <p>Books in your favourite genre: <b>{favoriteGenre}</b></p>}
      {books.length === 0 ? (
        <p>No books for this genre</p>
      ) : (

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
      )}
    </div>
    
  )
}

export default Recommendations
