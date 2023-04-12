import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ addBlog }) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	const [newBlogUrl, setNewBlogUrl] = useState('')

	const onSubmit = async event => {
		event.preventDefault()
		const blogObject = {
			title: newBlogTitle,
			author: newBlogAuthor,
			url: newBlogUrl,
		}
		addBlog(blogObject)
	}

	return (
		<form onSubmit={onSubmit}>

			<div>
				title:
				<input
					id="title-input"
					value={newBlogTitle}
					onChange={(event) => setNewBlogTitle(event.target.value)}
				/>
			</div>
			<div>
				author:
				<input
					id="author-input"
					value={newBlogAuthor}
					onChange={(event) => setNewBlogAuthor(event.target.value)}
				/>
			</div>
			<div>
				url:
				<input
					id="url-input"
					value={newBlogUrl}
					onChange={(event) => setNewBlogUrl(event.target.value)}
				/>
			</div>

			<button type='submit'>save</button>
		</form>
	)
}

AddBlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired
}

export default AddBlogForm