import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [visibleBlogId, setVisibleBlogId] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')


  }

  const handleLogin = async (event) => {
    event.preventDefault()


    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`logged in as ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {

      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (newBlog) => {

    try {
      const returnedBlog = await blogService.create(newBlog)
      const createdBlog = {
        ...returnedBlog,
        user: {
          id: user.id,
          name: user.name,
        },
      }
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${newBlog.title} ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error adding blog:', exception)
    }

  }
  const toggleBlogVisibility = (id) => {
    setVisibleBlogId(visibleBlogId === id ? null : id)
  }

  const handleLike = async (id) => {
    const likedBlog = blogs.find(blog => blog.id === id)

    const modifiedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(id, modifiedBlog)

      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? returnedBlog : blog
      )
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)


    } catch (exception) {

      setErrorMessage(`Error liking the blog: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleDelete = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)

    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      try {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (exception) {

        setErrorMessage(`Error deleting the blog: ${exception.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (

    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" name='login'>login</button>
      </form>
    </div>
  )




  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errorMessage={errorMessage}/>

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in  <button onClick={handleLogout}>Log out</button></p>
        <Togglable buttonLabel="create" name="create">
          <BlogForm
            addBlog={addBlog}
          />
        </Togglable>
      </div>
      }

      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            visible={visibleBlogId === blog.id}
            toggleVisibility={() => toggleBlogVisibility(blog.id)}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            user={user}

          />
        )}
      </div>
    </div>
  )

}

export default App
