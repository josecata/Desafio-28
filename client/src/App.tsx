import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import AdminPage from './Pages/AdminPage'
import { myContext } from './Pages/Context'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
	const ctx = useContext(myContext)
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				{ctx ? (
					<>{ctx.isAdmin ? <Route path='/admin' element={<AdminPage />}></Route> : null}</>
				) : (
					<>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/register' element={<Register />}></Route>
					</>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default App
