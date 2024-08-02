import React from 'react';
import { updateBlog } from '../reducers/blogReducer';

const Blog = ({
  blog,
  visible,
  toggleVisibility,
  handleLike,
  handleDelete,
  user,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <li>
        <span>
          {' '}
          {blog.title} {blog.author}{' '}
        </span>
        <button onClick={toggleVisibility} name="view">
          {visible ? 'hide' : 'view'}
        </button>
      </li>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes{' '}
            <button onClick={handleLike} name="like">
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {user && blog.user && user.id === blog.user.id && (
            <button onClick={handleDelete} name="delete">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
