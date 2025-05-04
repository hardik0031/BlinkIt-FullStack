import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='m-2 w-full rounded max-w-md py-5 bg-red-200 p-4 mx-auto flex flex-col justify-center items-center gap-5'>
            <p className='text-red-800 font-bold text-lg text-center'>Order Cancel</p>
            <Link to={'/'} className='border rounded text-red-900 border-red-900 hover:bg-red-900 hover:text-white px-4 py-1 transition-all'>Go To Home</Link>
        </div>
    )
}

export default Cancel
