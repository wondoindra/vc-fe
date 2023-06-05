import axios from 'axios'

export default axios.create({
  baseURL: 'https://vc-be-production.up.railway.app',
  timeout: 3000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})