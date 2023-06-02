import api from './api'

const login = data => api.post('/user/login', data)
const signup = data => api.post('/user/signup', data)

const userApis = {
  login,
  signup,
}

export default userApis