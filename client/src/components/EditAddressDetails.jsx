import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({ close, data }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: data._id,
            userId: data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            country: data.country,
            mobile: data.mobile,
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: {
                    ...data,
                    address_line: data.address_line,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile,
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='bg-black/70 fixed top-0 bottom-0 right-0 left-0 z-50 overflow-auto'>
            <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
                <div className='flex items-center justify-between gap-2'>
                    <h2 className='font-semibold'>Edit Address</h2>
                    <button onClick={close} className='cursor-pointer hover:text-red-500'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor='addressline'>Address Line :</label>
                        <input
                            type="text"
                            id='addressline'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("address_line", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type="text"
                            id='city'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("city", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='state'>State :</label>
                        <input
                            type="text"
                            id='state'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("state", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='pincode'>Pincode :</label>
                        <input
                            type="number"
                            id='pincode'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("pincode", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country :</label>
                        <input
                            type="text"
                            id='country'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("country", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='mobileNo'>Mobile No :</label>
                        <input
                            type="number"
                            id='mobileNo'
                            className='border border-blue-100 bg-blue-50 p-2 rounded'
                            {...register("mobile", { required: true })}
                        />
                    </div>

                    <button type='submit' className='bg-[var(--color-primary-200)] mt-4 rounded w-full py-2 font-semibold hover:bg-[var(--color-primary-100)]'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default EditAddressDetails