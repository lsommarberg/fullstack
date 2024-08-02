import { useState, useEffect, useContext } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [visibleBlogId, setVisibleBlogId] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setNotification(`logged in as '${user.name}'`, 5));
    } catch (exception) {
      dispatch(setNotification(exception, 5));
    }
  };

  const toggleBlogVisibility = (id) => {
    setVisibleBlogId(visibleBlogId === id ? null : id);
  };

  const handleLike = async (id) => {
    dispatch(updateBlog(id));
  };

  const handleDelete = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      dispatch(deleteBlog(id));
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" name="login">
          login
        </button>
      </form>
    </div>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel="create" name="create">
            <BlogForm user={user} />
          </Togglable>
        </div>
      )}

      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            visible={visibleBlogId === blog.id}
            toggleVisibility={() => toggleBlogVisibility(blog.id)}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
