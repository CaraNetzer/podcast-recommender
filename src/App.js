import './App.css';
import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./login/Login"
import { Register } from "./login/Register"
import { Authorized } from "./views/Authorized"
import { useState, useEffect } from "react"


export const App = () => {

	const [access_token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar access_token={access_token} setToken={setToken} />
					<ApplicationViews access_token={access_token} />
				</>
			</Authorized>

		} />
	</Routes>
}

export default App
