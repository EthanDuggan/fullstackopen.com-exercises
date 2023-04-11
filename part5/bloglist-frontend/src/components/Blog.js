import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
	const [showDetails, setShowDetails] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle}>
			{blog.title}
			{blog.author}
			<button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
			{showDetails &&
			<div>
				{blog.url}
				<br/>
				{blog.likes}
				<button onClick={() => likeBlog(blog.id)}>like</button>
				<br/>
				{blog.user.username}
			</div>
			}
			{blog.user.username === currentUser.username &&
			<div>
				<button onClick={() => deleteBlog(blog)}>remove</button>
			</div>
			}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	likeBlog: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired
}

export default Blog