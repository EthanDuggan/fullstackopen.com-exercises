const mongoose = require('mongoose')
const supertest = require('supertest')

const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('GET /api/blogs', () => {

	test('correct amount of blogs are returned when getting them all', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(initialBlogs.length)
	}, 100000)
	
	
	test('unique identifier of fetched blog posts is stored in property called "id"', async () => {
		const response = await api.get('/api/blogs')
		const firstBlogInList = response.body[0]
		expect(firstBlogInList.id).toBeDefined()
	}, 100000)

})


describe('POST /api/blogs', () => {

	test('works with valid data', async () => {
		const newBlog = {...singleBlogToAdd}

		const response = await api.post('/api/blogs').send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const returnedBlog = response.body
		expect(returnedBlog).toMatchObject(newBlog)
		
		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
		expect(blogsAtEnd).toContainEqual(returnedBlog)
	}, 100000)


	test('if the likes property is missing from request, it defaults to 0', async () => {
		const newBlogMissingLikes = {...singleBlogToAdd}
		delete newBlogMissingLikes.likes

		const response = await api.post('/api/blogs').send(newBlogMissingLikes)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const returnedBlog = response.body
		expect(returnedBlog).toMatchObject({...newBlogMissingLikes, likes: 0})

		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
		expect(blogsAtEnd).toContainEqual(returnedBlog)
	}, 100000)


	test('if the title property is missing from the request, the api returns with status code 400', async () => {
		const newBlogMissingTitle = {...singleBlogToAdd}
		delete newBlogMissingTitle.title

		const response = await api.post('/api/blogs').send(newBlogMissingTitle)
			.expect(400)
		
		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length)
	}, 100000)


	test('if the url property is missing from the request, the api returns with status code 400', async () => {
		const newBlogMissingUrl = {...singleBlogToAdd}
		delete newBlogMissingUrl.url

		const response = await api.post('/api/blogs').send(newBlogMissingUrl)
			.expect(400)
		
		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length)
	}, 100000)

})


describe('DELETE /api/blogs/:id', () => {
	
	test('works with valid id', async () => {
		const blogsAtStart = await getBlogsFromDB()
		const blogToDelete = blogsAtStart[0]

		await api.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)
		
		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
		expect(blogsAtEnd).not.toContainEqual(blogToDelete)
	}, 100000)

})


describe('PUT /api/blogs/:id', () => {

	test('works with valid id and data', async () => {
		const blogsAtStart = await getBlogsFromDB()
		const blogToUpdate = blogsAtStart[0]
		const newDataForBlogToUpdate = {...singleBlogToAdd}
		
		const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newDataForBlogToUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const returnedBlog = response.body
		const expectedUpdatedBlog = { id: blogToUpdate.id, ...newDataForBlogToUpdate }
		expect(returnedBlog).toMatchObject(expectedUpdatedBlog)
		
		const blogsAtEnd = await getBlogsFromDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length)
		expect(blogsAtEnd).toContainEqual(expectedUpdatedBlog)
	}, 100000)

	test('does not work with nonExistent id', async () => {
		const nonExistentId = await generateValidButNonExistingId()
		const newDataForBlogToUpdate = {...singleBlogToAdd}

		const response = await api.put(`/api/blogs/${nonExistentId}`)
			.send(newDataForBlogToUpdate)
			.expect(400)
	}, 100000)

})

describe('POST /api/users', () => {

	beforeEach(async () => {
		await User.deleteMany({})
		const userObjects = (await generateInitialUsers()).map(user => new User(user))
		const promiseArray = userObjects.map(userObject => userObject.save())
		await Promise.all(promiseArray)
	})

	test('user with non-unique username cannot be added', async () => {
		const usersAtStart = await getUsersFromDB()
		
		// try to add a user with an existing username
		const newUser = {
			username: usersAtStart[0].username,
			name: 'I should not exist',
			password: 'password123'
		}
		await api.post('/api/users').send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await getUsersFromDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 100000)

	test('user with too invalid username cannot be added', async () => {
		const usersAtStart = await getUsersFromDB()

		const newUser = {
			username: '12',
			name: 'I should not exist',
			password: 'password123'
		}
		await api.post('/api/users').send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await getUsersFromDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 100000)

	test('user with too invalid password cannot be added', async () => {
		const usersAtStart = await getUsersFromDB()

		const newUser = {
			username: 'IShouldNotExist',
			name: 'I should not exist',
			password: '12'
		}
		await api.post('/api/users').send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await getUsersFromDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 100000)


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

const singleBlogToAdd = {
	title: "This is being added for testing purposes",
	author: "Testman",
	url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	likes: 69,
}

const generateInitialUsers = async () => {
	const saltRounds = 10

	return [
		{
			username: "firstUser",
			name: "Bobby",
			passwordHash: await bcrypt.hash("12345", saltRounds)
		},
		{
			username: "secondUser",
			name: "Billy",
			passwordHash: await bcrypt.hash("12345", saltRounds)
		},
		{
			username: "thirdUser",
			name: "Joey",
			passwordHash: await bcrypt.hash("abcde", saltRounds)
		},
	]
}


const singleUserToAdd = {
	username: "addedUser",
	name: "Bart",
	password: "12345"
}

// HELPER FUNCTIONS
const getBlogsFromDB = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const getUsersFromDB = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const generateValidButNonExistingId = async () => {
	const blog = new Blog({title: 'will delete soon', author: 'x', url: 'x'})
	await blog.save()
	await blog.deleteOne()
	return blog._id.toString()
}