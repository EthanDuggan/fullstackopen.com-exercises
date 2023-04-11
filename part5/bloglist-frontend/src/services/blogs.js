import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newBlogObject => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlogObject, config)
	return response.data
}

const deleteBlog = async blogId => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.delete(
		`${baseUrl}/${blogId}`,
		config
	)
	return response.status
}

const update = async updateBlogObject => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.put(
		`${baseUrl}/${updateBlogObject.id}`,
		updateBlogObject,
		config
	)
	return response.data
}

export default {
	setToken,
	getAll,
	create,
	deleteBlog,
	update,
}