import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from '@apollo/client'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';


const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }


  return (
      <div>
      <nav>
        <form>
          <ul>
            <button type="button" onClick={() => navigate('/authors')}>Authors</button>
            <button type="button" onClick={() => navigate('/books')}>Books</button>
            {token ? (
              <>
                <button type="button" onClick={() => navigate('/add')}>Add Book</button>
                <button type="button" onClick={() => navigate('/recommendations')}>Recommendations</button>

                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <button type="button" onClick={() => navigate('/login')}>Login</button>
            )}
          </ul>
          </form>
        </nav>

        <Routes>
          <Route path="/login" element={!token ? <LoginForm setToken={setToken} /> : <Authors token={token}/>} />
          <Route path="/authors" element={<Authors token={token} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={token ? <NewBook /> : <LoginForm setToken={setToken} />} />
          <Route path="/" element={<Authors token={token}/>} />
          <Route path="/recommendations" element={<Recommendations />} />

        </Routes>
      </div>
  );
};

export default App;
