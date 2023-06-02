'use client'
import { useState, useEffect } from "react"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import userApi from '../api/user'

const Login = () => {

  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [name, setName] = useState('')

  const onRegister = async() => {
    const response = await userApi.signup({ email, password, name })
    if (response.ok) setMode('login')
  }

  const onLogin = async() => {
    const response = await userApi.login({ email, password })
    if (response.ok) return
  }

  const onButtonClick = () => {
    mode === 'login' ? onLogin() : onRegister()
  }

  const onChangeMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [mode])

  return (
    <section className="h-screen bg-white">
      <div className="h-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center border rounded">
          <div className="mb-5 w-1/2">
            <TextField
              fullWidth
              variant="outlined"
              label="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5 w-1/2">
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="w-1/2 text-center lg:text-left">
            <Button
              variant="contained"
              onClick={onButtonClick}
              className="bg-sky-600"
            >
              {mode.toUpperCase()}
            </Button>
            <p className="mb-0 mt-2 pt-1 text-sm text-black">
              {mode === 'login' ? `Don't have an account?` : 'Have account?'}
              <a
                onClick={onChangeMode}
                className="cursor-pointer font-semibold text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              >
                {mode === 'login' ? ' Register' : ' Login'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login