import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // DECLARE STATE HOOKS

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [showAddBlogForm, setShowAddBlogForm] = useState(false)
  const [notificationData, setNotificationData] = useState(null)

  // DECLARE EFFECT HOOKS

  // get all the blogs from the DB
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  // check for loggedInUser object in local storage
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // DECLARE EVENT HANDLERS
  const performLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showNotification(`Logged in ${user.username}`, 5000, false)
    } catch(exception) {
      console.error(exception)
      showNotification('wrong credentials', 5000, true)
    }
  }

  const handleLogout = event => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    showNotification('logged out', 5000, false)
  }

  const addBlog = async blogObject => {
    try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			showNotification(`new blog (${returnedBlog.title}) added`, 5000, false)
			setShowAddBlogForm(false)
		} catch (exception) {
			console.error(exception)
			showNotification(`Failed to add new blog.  Make sure to fill out all the fields.`, 8000, true)
		}
  }

  // MISC FUNCITONS

  const showNotification = (message, duration, isError) => {
    setNotificationData({ message, isError })
    setTimeout(() => setNotificationData(null), duration)
  }

  // show login form if no user logged in
  if (!user) {
    return (
      <div>
        <Notification notificationData={notificationData} />
        <h2>login</h2>
        <LoginForm performLogin={performLogin} />
      </div>
    )
  }

  return (
    <div>
        <Notification notificationData={notificationData} />
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>

        {showAddBlogForm &&
          <div>
            <h2>add blog</h2>
            <AddBlogForm addBlog={addBlog} />
          </div>
        }
        <button onClick={() => setShowAddBlogForm(!showAddBlogForm)}>{showAddBlogForm ? "cancel" : "add blog"}</button>

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        
    </div>
  )
}

export default App