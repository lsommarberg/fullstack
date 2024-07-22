import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          data-testid='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='write title here'
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='write author here'
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='write url here'
        />
      </div>
      <button type="submit" name='create'>create</button>
    </form>
  );
};

export default BlogForm