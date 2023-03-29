const _ = require('lodash')

const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.reduce(
		(sum, blog) => sum + blog.likes,
		0
	)
}

const favouriteBlog = blogs => {

	if (!blogs || blogs.length === 0) return null

	const favBlog = blogs.reduce(
		(mostLikedBlog, blog) => blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog
	)

	return {
		title: favBlog.title,
		author: favBlog.author,
		likes: favBlog.likes,
	}

}

const mostBlogs = blogs => {

	if (!blogs || blogs.length === 0) return null

	const countByAuthorPairs = _.toPairs(_.countBy(blogs, 'author'))
	const [mostFrequentAuthor, count] = _.maxBy(countByAuthorPairs, pair => pair[1])
	return {
		author: mostFrequentAuthor,
		blogs: count
	}
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
}