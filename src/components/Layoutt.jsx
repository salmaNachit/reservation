/* eslint-disable */
import React from 'react'
import Link from 'next/link';


export default function Layout({ currentStep }) {
    const steps = 5
    return (
        <>
            <div className="hidden md:flex flex-col items-center justify-between bg-white py-5 px-3 w-1/3 ">
                <ul className="flex items-center space-x-4">
                    {Array.from({ length: steps }, (_, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer border-4 rounded-full ${
                                index === 0
                                    ? 'border-black'
                                    : index < currentStep
                                    ? 'border-black'
                                    : 'border-gray-300'
                            }`}>
                            {' '}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src="/images/Untitled-1.png"
                        alt="Description de l'image"
                        className="w-full h-auto rounded-2xl  py-5"
                    />
                    <h2 className="font-bold text-white">
                        Sélection de service
                    </h2>
                    <p className="text-gray-500 text-center text-white">
                        Veuillez sélectionner un service pour lequel vous
                        souhaitez prendre rendez-vous
                    </p>
                </div>

                <div className="text-center space-y-1 font-semibold text-sm">
                    <h2>Pour plus d'infos ?</h2>
                    <p className="text-xs text-white-500 text-center">
                        Appelez +2125555555 pour obtenir de l'aide

                    </p>
                </div>
                <span className="block mt-2 text-[#97793D]">
                            <Link href="/PrivacyPolicy">
               Politique de confidentialité
              </Link>
            </span>

            </div>
        </>
    )
}
