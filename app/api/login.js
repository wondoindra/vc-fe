import api from './api'

const login = data => api.post('/login', data)

const loginApi = {
  login,
}

export default loginApi