import { useState } from 'react'

const LoginForm = ({ performLogin }) => {
	const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

	const onSubmit = event => {
		event.preventDefault()
		performLogin(username, password)
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)
}

export default LoginForm