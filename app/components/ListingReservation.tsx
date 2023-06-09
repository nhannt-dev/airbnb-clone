'use client'

import React from 'react'
import { Range } from 'react-date-range'
import { Button, Calendar } from './'

interface ListingReservationProps {
    price: number
    dateRange: Range
    totalPrice: number
    onChangeDate: (value: Range) => void
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({ dateRange, price, totalPrice, onChangeDate, onSubmit, disabledDates, disabled }) => {

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>${price}</div>
                <div className='text-neutral-600 font-light'>night</div>
            </div>
            <hr />
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
            <hr />
            <div className='p-4'>
                <Button label='Reserve' disabled={disabled} onClick={onSubmit} />
            </div>
            <hr />
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
        </div>
    )
}

export default ListingReservation