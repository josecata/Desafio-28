import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

export default function Login() {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [systemMessage, setSystemMessage] = useState<string>('')

	const login = () => {
		axios
			.post(
				'http://localhost:8080/login',
				{
					username,
					password,
				},
				{
					withCredentials: true,
				}
			)
			.then((res:AxiosResponse) => {
				if (res.data === 'success') {
					window.location.href = '/'
				}
			},()=>{
				setSystemMessage('Username or password invalid')
			})
	}

	return (
		<div>
			<h1>Login</h1>
			<input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
			<input type='text' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
			<button onClick={login}>Login</button>
			{systemMessage ? (<span>{systemMessage}</span>): null}
		</div>
	)
}
