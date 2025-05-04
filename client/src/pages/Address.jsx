import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDeleteForever } from "react-icons/md";
import { FaPencil } from 'react-icons/fa6';
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id
        }
      })
      if (response.data.success) {
        toast.success("Address Remove")
        if (fetchAddress) {
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div>
      <div className='bg-white shadow-lg px-2 py-2 flex justify-between items-center gap-4'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-[var(--color-primary-200)] text-[var(--color-primary-200)] hover:bg-[var(--color-primary-200)] hover:text-black py-1 px-3 rounded-full'>
          Add Address
        </button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            return (
              <div key={index} className={`border bg-white border-blue-100 rounded p-3 flex gap-3 ${!address.status && "hidden"}`}>
                <div className='w-full'>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className='grid gap-10'>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='bg-green-300 p-1 rounded hover:bg-green-600 hover:text-white'>
                    <FaPencil />
                  </button>
                  <button onClick={() => {
                    handleDisableAddress(address._id)
                  }} className='bg-red-300 rounded hover:bg-red-600 hover:text-white'>
                    <MdDeleteForever size={25} />
                  </button>
                </div>
              </div>
            )
          })
        }
        {/* <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-blue-100 border-dashed flex justify-center items-center cursor-pointer'>
          Add address
        </div> */}
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
        )
      }
    </div>
  )
}

export default Address
