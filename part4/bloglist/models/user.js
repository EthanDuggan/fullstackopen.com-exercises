const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	passwordHash: {
		type: String,
		required: true
	}
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
		//the passwordHash must not be revealed!
		delete ret.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User