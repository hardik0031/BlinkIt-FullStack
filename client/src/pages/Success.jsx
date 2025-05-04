/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()



    return (
        <div className='m-2 w-full rounded max-w-md py-5 bg-green-200 p-4 mx-auto flex flex-col justify-center items-center gap-5'>
            <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Sucessfully </p>
            <Link to={'/'} className='border rounded text-green-900 border-green-900 hover:bg-green-900 hover:text-white px-4 py-1 transition-all'>Go To Home</Link>
        </div>
    )
}

export default Success
