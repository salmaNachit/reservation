/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react'
import Layoutt from './Layoutt'
import { FaArrowLeft } from 'react-icons/fa'
import Result from '@/components/Result'
import Login from '@/components/login'
import Calendar2 from '@/components/Calendar2'
import Register from '@/components/Register'
import categories from '@/lib/server'

export default function Stepper() {
    const [openTab, setOpenTab] = React.useState(1)//
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const [currentStep, setCurrentStep] = useState(0)
    // const [showNextButton, setShowNextButton] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [reservations, setReservations] = useState([])
    const [settings, setSettings] = useState()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.backend_url}/api/appointments`,
                )
                const data = await response.json()
                setReservations(data)
            } catch (error) {
                //console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])
    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await fetch(
                    `${process.env.backend_url}/api/settings`,
                )
                const data2 = await response.json()
                setSettings(data2)
            } catch (error) {
                //console.error('Error fetching data:', error)
            }
        }

        fetchData2()
    }, [])

    //console.log(settings?.data?.default_currency);
    const handleRegistrationSuccess = (id, name, email) => {
        setUserId(id)
        setUserName(name)
        setUserEmail(email)
        setCurrentStep(4)
        //setIsUserRegistered(true);
    }

    const handleLoginSuccess = (id, name, email) => {
        setUserId(id)
        setUserName(name)
        setUserEmail(email)
        setCurrentStep(4)
    }
    //console.log(userId, userEmail, userName)

    const handleCategorieSelect = categorie => {
        setSelectedCategorie(categorie)
        setCurrentStep(1)
    }

    const handleServiceSelect = service => {
        setSelectedService(service)
        setCurrentStep(2)
    }

    const handleStepBack = () => {
        setCurrentStep(prevStep => prevStep - 1)
        // setShowNextButton(false)
    }

    const handleTimeSelect = hour => {
        setSelectedDateTime(hour)
        // setShowNextButton(true)
        setCurrentStep(3)
    }

    const handlePriceSelect = () => {
        // setShowNextButton(false)
        setCurrentStep(5)
    }


    const renderSwitch = step => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <h1 className="text-xl px-5 font-semibold italic font-mono">
                            Liste des categories
                        </h1>
                        <ul className="grow px-5 py-6 space-y-4 ">
                            {categories.map((categorie, index) => (
                                <li
                                    key={index}
                                    className="group cursor-pointer hover:scale-105 bg-white hover:border-pink-100 duration-300 flex items-center justify-between border  p-2 filter drop-shadow-md md:drop-shadow-xl rounded-xl"
                                    onClick={() =>
                                        handleCategorieSelect(categorie)
                                    }>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            className="h-12"
                                            src="data:image/png;base64,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"
                                            alt="dgdf"
                                        />
                                        <h3
                                            className={`group-hover:text-97793D duration-300 font-semibold text-gray-700 ${
                                                selectedCategorie === categorie
                                                    ? 'text-97793D'
                                                    : ''
                                            }`}>
                                            {categorie?.name}

                                        </h3>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {categorie?.services?.length}{' '}
                                        Service(s)
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            //Select Service
            case 1:
                if (selectedCategorie) {
                    return (
                        <div className="os-animated-child os-item os-selectable-item  os-priced-item with-description ">
                            <span className="os-item-name flex justify-center mt-2">
                                <h1 className="text-xl px-5 font-semibold italic font-mono">
                                    Services de {selectedCategorie.name}
                                </h1>
                                {/*  <b>Services de {selectedCategorie.name}</b> */}
                            </span>
                            <ul className="grow px-5 py-6 space-y-4 overflow-auto">
                                {selectedCategorie.services.map(
                                    (service, index) => (
                                        <li
                                            key={index}
                                            className="group bg-white cursor-pointer hover:scale-105 hover:border-pink-100 duration-300  items-center justify-between border rounded-xl p-2 my-6 px-8 "
                                            data-aos="flip-up"
                                            onClick={() =>
                                                handleServiceSelect(service)
                                            }>
                                            <h3 className="text-1xl">
                                                <b>{service.name}</b>
                                            </h3>
                                            <div className="flex items-center space-x-3">
                                                <span className="">
                                                    {service.description}
                                                </span>
                                                <span className="">
                                                    <span className="">
                                                        {service.price}
                                                    </span>
                                                </span>
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    )
                }
                break
            //Select DateTime
            case 2:
                if (selectedService) {
                    return (
                        <div className="transition-transform transform-gpu">
                            <h1 className="text-xl px-5 font-semibold italic font-mono ">
                                Date & Heure
                            </h1>
                            <Calendar2
                                onTimeSelect={handleTimeSelect}
                                reservations={reservations}
                            />
                        </div>
                    )
                }
                break
            //Registration
            case 3:
                if (selectedCategorie && selectedService) {
                    return (
                        <div className="flex flex-wrap mx-5 mb-10">
                            <h1 className="text-xl px-5 font-semibold italic font-mono">
                                Informations client
                            </h1>
                            <div className="w-full">
                                <ul
                                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                    role="tablist">
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                            className={
                                                'text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal ' +
                                                (openTab === 1
                                                    ? 'text-black bg-white'
                                                    : 'text-black bg-transparent')
                                            }
                                            onClick={e => {
                                                e.preventDefault()
                                                setOpenTab(1)
                                            }}
                                            data-toggle="tab"
                                            href="#link1"
                                            role="tablist">
                                            Nouveau client
                                        </a>
                                    </li>
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                            className={
                                                'text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal ' +
                                                (openTab === 2
                                                    ? 'text-black bg-white'
                                                    : 'text-black bg-transparent')
                                            }
                                            onClick={e => {
                                                e.preventDefault()
                                                setOpenTab(2)
                                            }}
                                            data-toggle="tab"
                                            href="#link2"
                                            role="tablist">
                                            Vous avez déjà un compte?
                                        </a>
                                    </li>
                                </ul>
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="tab-content tab-space">
                                            <div
                                                className={
                                                    openTab === 1
                                                        ? 'block'
                                                        : 'hidden'
                                                }
                                                id="link1">
                                                <Register
                                                    onRegistrationSuccess={
                                                        handleRegistrationSuccess
                                                    }
                                                />
                                                {/*                                             {userId && <p>User ID: {userId}</p>}
                                                 */}{' '}
                                            </div>
                                            <div
                                                className={
                                                    openTab === 2
                                                        ? 'block'
                                                        : 'hidden'
                                                }
                                                id="link2">
                                                <Login
                                                    onLoginSuccess={
                                                        handleLoginSuccess
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                break
            // Select Price
            case 4:
                if (selectedCategorie && selectedService) {
                    return (
                        <section>
                            <div className="os-animated-child os-item os-selectable-item  os-priced-item with-description cursor-pointer">
                                <h1 className="text-xl px-5 font-semibold">
                                    Price Slected
                                </h1>
                                <ul className="">
                                    <li
                                        className="mt-10 flex justify-center bg-f8eaa1 mx-5 py-5 rounded-full mb-16 shadow-2xl"
                                        onClick={() => handlePriceSelect()}>
                                        <span className="">
                                            {selectedService.price}{settings?.data?.default_currency}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    )
                }
                break
            //Booking
            case 5:
                if (selectedDateTime) {
                    return (
                        <div>
                            <h1 className="text-xl px-5 font-semibold italic font-mono">
                                Confirmation de rendez-vous
                            </h1>
                            <Result
                                dateTime={selectedDateTime.toLocaleString()}
                                // selectedDate={selectedDateTime?.hour}
                                // selectedTime={selectedDateTime?.hour}
                                selectedService={selectedService}
                                userId={userId}
                                userName={userName}
                                userEmail={userEmail}
                            />
                        </div>
                    )
                }
                break
            default:
                return null
        }
    }
    return (
        <div
            className={`flex rounded h-638 w-full lg:w-8/12 border md:w-full shadow-2xl mx-1 overflow-hidden backdrop-blur-md sm:mt-10`}>
            <Layoutt currentStep={currentStep} />
            <div className="flex flex-col relative w-full md:w-2/3 h-full scrollbar  scrollbar-thumb-[#e0c794] scrollbar-track-[#fce9c0] overflow-y-scroll hover:scrollbar-thumb-[#e0c794]">
                <div className="flex-none border-b py-3">
                    {renderSwitch(currentStep)}
                </div>
                {currentStep > 0 && (
                    <button
                        onClick={handleStepBack}
                        className="sticky  bottom-0 left-0 mb-2 ml-5">
                        <span className="flex items-center">
                            {<FaArrowLeft />} Retour
                        </span>{' '}
                    </button>
                )}
            </div>
            {selectedCategorie && selectedService && (
                <div className="hidden md:flex flex-col  bg-white py-5 px-3 w-1/3 ">
                    <p className="py-5 text-3xl italic font-mono">
                        {selectedService.name.en}
                    </p>
                    {selectedDateTime && (
                        <div className="py-5 text-blue-900">
                            {selectedDateTime.toLocaleString()}
                        </div>
                    )}
                    <div className="text-xl py-5">client : {userName}</div>
                    {handlePriceSelect && (
                        <p>Prix : {selectedService.price}{settings?.data?.default_currency} </p>
                    )}
                </div>
            )}
        </div>
    )
}
