import axios, { AxiosResponse } from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../Pages/Context'

export default function NavBar() {
	const ctx = useContext(myContext)
	const logout = () => {
		axios.get('http://localhost:8080/logout', { withCredentials: true }).then((res:AxiosResponse) => {
			if (res.data === 'success') {
				window.location.href = '/'
			}
		})
	}
	return (
		<div>
			{ctx ? (
				<>
					<Link onClick={logout} to='/logout'>
						Logout
					</Link>
					{/* <button onClick={logout}>Logout</button> */}
					{ctx.isAdmin ? <Link to='/admin'>Admin</Link> : null}
				</>
			) : (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</>
			)}
			<Link to='/'>Home</Link>
		</div>
	)
}
