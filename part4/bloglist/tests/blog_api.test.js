const mongoose = require('mongoose')
const supertest = require('supertest')
const blog = require('../models/blog')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// CODE FOR INITIALIZING THE DATABASE BEFORE TESTS

beforeEach(async () => {
	//delete all blogs
	await Blog.deleteMany({})
	//add initial blogs
	const blogObjects = initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blogObject => blogObject.save())
	await Promise.all(promiseArray)
})

// TESTS

test('correct amount of blogs are returned when getting them all', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)


test('unique identifier of fetched blog posts is stored in property called "id"', async () => {
	const response = await api.get('/api/blogs')
	const firstBlogInList = response.body[0]
	expect(firstBlogInList.id).toBeDefined()
}, 100000)

test('verify that post request to /api/blogs works as expected', async () => {
	const newBlog = {
		title: "This is being added for testing purposes",
		author: "Testman",
		url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
		likes: 69,
	}

	const response = await api.post('/api/blogs').send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	
	const returnedBlog = response.body
	expect(returnedBlog).toMatchObject(newBlog)
	
	const blogsAtEnd = await getBlogsFromDB()
	expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
	expect(blogsAtEnd).toContainEqual(returnedBlog)
})

// CLOSE DB CONNECTION AFTER TESTING
afterAll(async () => {
	await mongoose.connection.close()
})


// TEST DATA
const initialBlogs = [
	{
	title: "This blog is very important",
	author: "Mr Nobody",
	url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	likes: 57,
	},
	{
	title: "Why Blogs are Stupid",
	author: "Sam",
	url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	likes: 1000,
	},
	{
	title: "Shrimp Are Evil",
	author: "doodman the great",
	url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	likes: 2,
	}
]

// HELPER FUNCTIONS
const getBlogsFromDB = async () => {
	const blogs = await blog.find({})
	return blogs.map(blog => blog.toJSON())
}