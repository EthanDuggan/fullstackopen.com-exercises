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

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}