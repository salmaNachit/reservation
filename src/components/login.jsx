/* eslint-disable */
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${process.env.backend_url}/api/login`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
            const userId = response.data.data.id
            const userEmail = response.data.data.email
            const userName = response.data.data.name
            //console.log(response.data.success)
            onLoginSuccess(userId, userName, userEmail)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "l'adresse e-mail ou le mot de passe saisi est incorrect",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="block mt-4">
                <input
                    type="email"
                    required
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none rounded shadow-lg"
                    onChange={handleChange}
                />
            </div>
            <div className="block mt-4">
                <input
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none rounded shadow-lg"
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center justify-end mt-4">
                <button
                    type="submit"
                    className=" bottom-0 right-0 mb-2  mr-5 ml-5 bg-f8eaa1 px-4 py-1 rounded">
                    Se connecter
                </button>
            </div>
        </form>
    )
}

export default Login
