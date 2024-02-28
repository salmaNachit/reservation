/* eslint-disable */
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = ({ onRegistrationSuccess }) => {
    //const [gest, setGest] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
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
                `${process.env.backend_url}/api/step_registration`,
                formData,
            )
            const userId = response.data.id
            const userEmail = response.data.email
            const userName = response.data.name
            if (response.data.status === 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: response.data.message,
                })
            } else {
                onRegistrationSuccess(userId, userName, userEmail)
            }
            //setGest(response.data.message)
            //console.log('voila', gest)
            /*if (response.request.status == 422) {
            }*/
        } catch (error) {
            // console.error('Erreur lors de la requête :', error)
        }
    }
    //console.log(gest)

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-3 sm:flex-row sm:flex-wrap  ">
            <div className="mt-4">
                <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="text-xs font-bold  px-3 py-3 shadow-lg rounded block leading-normal border border-gray-300 w-full"
                />
            </div>
            <div className="mt-4">
                <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="text-xs font-bold  px-3 py-3 shadow-lg rounded block leading-normal border border-gray-300 w-full"
                />{' '}
            </div>
            <div className="mt-4">
                <input
                    type="tel"
                    required
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="text-xs font-bold  px-3 py-3 shadow-lg rounded block leading-normal border border-gray-300 w-full"
                />{' '}
            </div>
            <div className="mt-4">
                <input
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="text-xs font-bold  px-3 py-3 shadow-lg rounded block leading-normal border border-gray-300 w-full"
                />{' '}
            </div>

            <div className="mt-4">
                <input
                    type="password"
                    required
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="confirm password"
                    className="text-xs font-bold  px-3 py-3 shadow-lg rounded block leading-normal border border-gray-300 w-full"
                />{' '}
            </div>

            <button
                type="submit"
                className=" absolute bottom-0 right-0 mb-2 mr-5 ml-5 bg-f8eaa1 px-4 py-1 rounded">
                Suivant
            </button>
        </form>
    )
}

export default Register
