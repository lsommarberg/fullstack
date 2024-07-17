const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response, next) => {

  const user = request.user
  const body = request.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)

  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message })
    } else {
      next(error)
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
 try {
  const user = request.user
  const userid = user.id
  const blog = await Blog.findById(request.params.id)
  if (!user || !blog) {
    response.status(404).json({ error: 'Blog or associated user not found'  })
  }
  if ( blog.user.toString() === userid.toString() ) {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(201).json(result)
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(result)
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message });
    } else {
      next(error)
    }
  }
})





module.exports = blogsRouter
