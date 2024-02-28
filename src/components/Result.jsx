/* eslint-disable */
import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { DotLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { AiOutlineCheck } from 'react-icons/ai'

const Result = ({ selectedService, userId, dateTime, userEmail, userName }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formattedDateTime = moment(dateTime, 'DD/MM/YYYY HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss',
    )
    //console.log('id', userId)
    //console.log('email', userEmail)
    //console.log('name', userName)

    const handleConfirmClick = async () => {
        if (isSubmitting || !dateTime) {
            return
        }
        setIsSubmitting(true)
        try {
            await axios.post(
                `${process.env.backend_url}/api/appointments`,
                {
                    user_id: userId,
                    date_time: formattedDateTime,
                    selectedService: selectedService.name.en,
                    servicePrice: selectedService.price,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            )
            Swal.fire({
                icon: 'success',
                title: 'Confirmation successful!',
                showConfirmButton: false,
                timer: 1500,
            })
            setTimeout(() => {
                window.location.reload()
            }, 1700)
        } catch (error) {
            //console.error('Error:', error)
            Swal.fire({
                icon: 'error',
                title: 'Confirmation échouée',
                text: 'Something went wrong!',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="pt-2 mx-5 rounded">
            <div className="bg-white relative  rounded-2xl w-full mx-auto container mb-10 shadow-2xl ">
                <div className="mt-16 mb-10">
                    <div className="my-5 px-6 rounded-2xl pt-5">
                        <div
                            href="#"
                            className="text-black block  text-center font-medium leading-6 px-6 py-3 bg-f8eaa1 hover:bg-bfc6d0  rounded-xl ">
                            Service : {selectedService?.name.en}{' '}
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className=" text-gray-900 text-left px-6 mb-2">
                            {' '}
                            <span className="font-bold"> Client :</span>{' '}
                            {userEmail}{' '}
                        </h3>
                        <h3 className=" text-gray-900 text-left  px-6 ">
                            {' '}
                            {userName}{' '}
                        </h3>
                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <div
                                href="#"
                                className=" border-t border-gray-100 text-gray-900 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <AiOutlineCheck className="rounded-full h-6  inline-block mr-2" />
                                Date :
                                <span className="text-gray-900 text-xs">
                                    {' '}
                                    {formattedDateTime}{' '}
                                </span>
                            </div>
                            <div
                                href="#"
                                className=" border-t border-gray-100 text-gray-900 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                <AiOutlineCheck className="rounded-full h-6  inline-block mr-2" />
                                Price :
                                <span className="text-gray-900 text-xs">
                                    {selectedService?.price} MAD
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6 mt-2">
                <button
                    className={`absolute bottom-0 right-0 mb-2 mt-5 m-5 bg-f8eaa1 px-4 py-1 rounded  ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleConfirmClick}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                        <DotLoader
                            color="#000000"
                            size={30}
                            className=" px-10"
                        />
                    ) : (
                        'Confirmer'
                    )}
                </button>
            </div>
        </div>
    )
}

export default Result
