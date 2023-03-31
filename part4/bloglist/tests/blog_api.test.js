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