import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

	let container
	let likeBlogMockFunc
	let deleteBlogMockFunc

	beforeEach(() => {
		likeBlogMockFunc = jest.fn()
		deleteBlogMockFunc = jest.fn()

		container = render(
			<Blog
				blog={testBlog}
				likeBlog={likeBlogMockFunc}
				deleteBlog={deleteBlogMockFunc}
				currentUser={testUser}
			/>
		).container
	})

	test('renders title and author, but not details at first', () => {
		const blogElement = container.querySelector('.blog')
		expect(blogElement).toBeInTheDocument()
		const title = screen.queryByText(testBlog.title, { exact: false })
		expect(title).toBeInTheDocument()
		const author = screen.queryByText(testBlog.author, { exact: false })
		expect(author).toBeInTheDocument()
		const blogDetails = container.querySelector('.blogDetails')
		expect(blogDetails).not.toBeInTheDocument()
		const url = screen.queryByText(testBlog.url, { exact: false })
		expect(url).not.toBeInTheDocument()
		const likes = screen.queryByText(testBlog.likes, { exact: false })
		expect(likes).not.toBeInTheDocument()
	})


	test('renders the details when the "view" button is clicked', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const blogDetails = container.querySelector('.blogDetails')
		expect(blogDetails).toBeInTheDocument()
		const url = screen.queryByText(testBlog.url, { exact: false })
		expect(url).toBeInTheDocument()
		const likes = screen.queryByText(testBlog.likes, { exact: false })
		expect(likes).toBeInTheDocument()
	})


	test('if the like button is clicked twice, then the associated event handler is invoked twice', async () => {
		// click the view button to expose the like button
		const user = userEvent.setup()
		const viewButton = screen.getByText('view')
		await user.click(viewButton)
		// click the like button twice
		const likeButton = screen.getByText('like')
		await user.click(likeButton)
		await user.click(likeButton)
		// check that the stub event handler was invoked twice
		expect(likeBlogMockFunc.mock.calls).toHaveLength(2)
	})

})

// HELPER FUNCTIONS AND OBJECTS

const testUser = {
	username: 'Test Username',
	name: 'Test Name',
	id: 'TestUserID'
}

const testBlog = {
	id: 'TestBlogID',
	title: 'Test Blog',
	author: 'Test Author',
	url: 'http://TestUrl',
	likes: 69,
	user: { ...testUser }
}
