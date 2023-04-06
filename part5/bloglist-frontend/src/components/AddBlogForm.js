import { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ blogs, setBlogs, showNotification }) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

	const handleAddBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			showNotification(`new blog (${returnedBlog.title}) added`, 5000, false)
			setNewBlogTitle('')
			setNewBlogAuthor('')
			setNewBlogUrl('')
		} catch (exception) {
			console.error(exception)
			showNotification(`Failed to add new blog.  Make sure to fill out all the fields.`, 8000, true)
		}
  }
	
	return (
		<form onSubmit={handleAddBlog}>

			<div>
				title:
				<input
					value={newBlogTitle}
					onChange={(event) => setNewBlogTitle(event.target.value)}
				/>
			</div>
			<div>
				author:
				<input
					value={newBlogAuthor}
					onChange={(event) => setNewBlogAuthor(event.target.value)}
				/>
			</div>
			<div>
				url:
				<input
					value={newBlogUrl}
					onChange={(event) => setNewBlogUrl(event.target.value)}
				/>
			</div>

			<button type='submit'>save</button>
		</form>
	)
}

export default AddBlogForm