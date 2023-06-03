'use client'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import userApi from '../api/user'
import { useUserContext } from '../../context/context'

const Login = () => {
  const { user, setUser } = useUserContext()
  const router = useRouter()

  const [mode, setMode] = useState('LOGIN')
  const [email, setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [name, setName] = useState('')

  const onRegister = async() => {
    const response = await userApi.signup({ email, password, name })
    console.log(response)
    if (response.status === 200) setMode('LOGIN')
  }

  const onLogin = async() => {
    const response = await userApi.login({ email, password })
    if (response.ok) {
      setUser({ loggedIn: true })
      if (user.mode === 'ADMIN') return router.push('/admin')
      return router.push('/')
    }
  }

  const onButtonClick = () => {
    mode === 'LOGIN' ? onLogin() : onRegister()
  }

  const onChangeMode = () => {
    setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')
  }

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
  }, [mode])

  return (
    <section className="h-screen bg-white">
      <div className="h-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center border rounded">
          {mode === 'REGISTER' && (
            <div className="mb-5 w-1/2 flex justify-center items-center">
              <TextField
                fullWidth
                variant="outlined"
                label="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}
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
              {mode === 'LOGIN' ? `Don't have an account?` : 'Have account?'}
              <a
                onClick={onChangeMode}
                className="cursor-pointer font-semibold text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              >
                {mode === 'LOGIN' ? ' Register' : ' Login'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login