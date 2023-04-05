const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'URIError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

// extracts the JWT from the authorization header and stores it in request.token
const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

// decodes the JWT and stores the user id in request.user
const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (decodedToken.id) {
		request.user = decodedToken.id
	}
	next()
}

module.exports = {
	errorHandler,
	tokenExtractor,
	userExtractor,
}