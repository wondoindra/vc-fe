import api from './api'

const login = data => api.post('/admin/login', data)
const getUsers = () => api.get('/admin/users')
const verifyUser = id => api.post(`/admin/verify/${id}`)

const adminApis = {
  login,
  getUsers,
  verifyUser,
}

export default adminApis