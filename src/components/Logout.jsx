/* eslint-disable */
// pages/Logout.js
import { useState } from 'react'
import axios from 'axios'

const Logout = () => {
    const [logoutStatus, setLogoutStatus] = useState(null)

    const handleLogout = async () => {
        try {
            await axios.get('http://192.168.1.17:8000/api/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    api_token:
                        'PivvPlsQWxPl1bB5KrbKNBuraJit0PrUZekQUgtLyTRuyBq921atFtoR1HuA', // Replace with your actual API token
                },
            })

            //console.log(response.data)

            setLogoutStatus({
                success: true,
                message: 'User logout successful',
            })
        } catch (error) {
            //console.error('Error during logout:', error)

            // Handle logout error
            setLogoutStatus({
                success: false,
                message: 'Error during logout',
            })
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {logoutStatus && (
                <p>
                    {logoutStatus.success
                        ? `Logout successful: ${logoutStatus.message}`
                        : `Logout failed: ${logoutStatus.message}`}
                </p>
            )}
        </div>
    )
}

export default Logout
