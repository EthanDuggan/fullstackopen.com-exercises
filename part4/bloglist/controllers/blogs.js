const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


// ROUTES

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blogInfo = request.body
  
  // check for current user
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // find the user using the information form the decoded JWT
  const user = await User.findById(request.user)

  // define new Blog object
  const blog = new Blog({ ...blogInfo, user: user.id })

  // save blog
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (!request.user || request.user.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  // check for current user
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const { title, author, url, likes } = request.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  
  if (!updatedBlog){
    throw new URIError(`blog with id=${request.params.id} not found`)
  }

  response.json(updatedBlog)
})

// HELPER FUNCTIONS

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}*/

module.exports = blogsRouter