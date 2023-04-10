import { useState } from 'react'

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