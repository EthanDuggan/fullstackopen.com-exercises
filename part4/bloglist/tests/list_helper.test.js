const listHelper = require('../utils/list_helper')

describe('dummy', () => {
	test('dummy returns one', () => {
		const blogs = []
		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})


describe('total likes', () => {

	test('of empty list is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})

	test('when list has only one blog, result equals the likes of that one blog', () => {
		expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
	})

	test('of a bigger list is calculated right', () => {
		expect(listHelper.totalLikes(blogs)).toBe(200)
	})

})

describe('favourite blog', () => {

	test('of an empty list is null', () => {
		expect(listHelper.favouriteBlog([])).toBeNull()
	})

	test('when the list only has one blog, is that one blog', () => {
		const expectedObject = {
			title: listWithOneBlog[0].title,
			author: listWithOneBlog[0].author,
			likes: listWithOneBlog[0].likes,
		}
		expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(expectedObject)
	})

	test('of a bigger list is calculated right', () => {
		const expectedObject = {
			title: blogs[4].title,
			author: blogs[4].author,
			likes: blogs[4].likes,
		}
		expect(listHelper.favouriteBlog(blogs)).toEqual(expectedObject)
	})

})

describe('author with most blogs', () => {

	test('of an empty list is null', () => {
		expect(listHelper.mostBlogs([])).toBeNull()
	})

	test('when the list only has one blog, is author of that blog', () => {
		const expectedObject = {
			author: listWithOneBlog[0].author,
			blogs: 1
		}
		expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expectedObject)
	})

	test('of a bigger list is calculated right', () => {
		const expectedObject = {
			author: 'Robert C. Martin',
			blogs: 3
		}
		expect(listHelper.mostBlogs(blogs)).toEqual(expectedObject)
	})

})

// TEST DATA (WARNING: CHANGING THE TEST DATA WILL CAUSE SOME TESTS TO FAIL BECAUSE THE EXPECTED VALUES ARE HARDCODED IN THE TESTS)
// some tests may use their own data if the test data defined below is not able to facilitate the test

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 20,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 30,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 40,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 100,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 0,
		__v: 0
	}  
]