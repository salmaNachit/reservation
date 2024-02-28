/* eslint-disable */
'use client'
import {format, isSameMinute} from 'date-fns'
import {CheckCircle2} from 'lucide-react'
import React, {memo, useState} from 'react'
import {cn} from '../lib/utils'

// eslint-disable-next-line react/display-name
const AvailableHours = memo(({freeTimes, onTimeSelect}) => {
    const [selectedTime, setSelectedTime] = useState(null)

    const handleSelectedTime = async hour => {
        try {
            onTimeSelect(hour) // Call onTimeSelect before setting selectedTime
            setSelectedTime(hour)
        } catch (error) {
            //console.error('Error creating reservation:', error);
        }
    }
    return (
        <div className="flex flex-col items-center gap-2  p-4 pb-10">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6  text-md gap-2">
                {freeTimes.map((hour, hourIdx) => (
                    <div key={hourIdx}>
                        <button
                            type="button"
                            className={cn(
                                'bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]',
                                selectedTime &&
                                isSameMinute(selectedTime, hour) &&
                                'bg-green-400 text-gray-800',
                            )}
                            onClick={() => handleSelectedTime(hour)}>
                            <CheckCircle2
                                className={cn(
                                    'w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-green-700',
                                    selectedTime &&
                                    isSameMinute(selectedTime, hour) &&
                                    'block',
                                )}
                            />
                            {format(hour, 'HH:mm')}
                        </button>
                    </div>
                ))}
            </div>
            {selectedTime && (
                <div className="w-full py-6">
                    <span>Final selected reservation time is: </span>
                    <span className="font-semibold text-rose-950 pl-1">
                        {format(selectedTime, 'dd MMMM yyyy HH:mm')}
                    </span>
                </div>
            )}
        </div>
    )
})

export default AvailableHours
