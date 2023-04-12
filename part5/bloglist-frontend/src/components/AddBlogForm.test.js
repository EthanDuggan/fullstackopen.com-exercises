import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {

	let container
	let addBlogMockFunc
	beforeEach(() => {
		addBlogMockFunc = jest.fn()
		container = render(
			<AddBlogForm addBlog={addBlogMockFunc} />
		).container
	})

	test('form calls the "addBlog" event handler with the right details when a new blog is created', async () => {
		const user = userEvent.setup()
		//enter the data into the forms
		const titleInput = container.querySelector('#title-input')
		await user.type(titleInput, testBlogFormData.title)
		const authorInput = container.querySelector('#author-input')
		await user.type(authorInput, testBlogFormData.author)
		const urlInput = container.querySelector('#url-input')
		await user.type(urlInput, testBlogFormData.url)
		//submit the form
		const submitButton = screen.getByText('save')
		await user.click(submitButton)

		expect(addBlogMockFunc.mock.calls).toHaveLength(1)
		expect(addBlogMockFunc.mock.calls[0][0]).toMatchObject(testBlogFormData)
	})

})

const testBlogFormData = {
	title: 'Test Title',
	author: 'Test Author',
	url: 'http://TestUrl'
}