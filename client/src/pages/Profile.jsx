/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserAvatarEdit from '../components/UserAvatarEdit.jsx';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js'
import AxiosToastError from '../utils/AxiosToastError.js';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice.js';
import fetchUserDetails from '../utils/fetchUserDetails.js';

const Profile = () => {

  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  })

  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setUserData({
      name: user.name,
    email: user.email,
    mobile: user.mobile,
    })
  },[])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data : userData
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }


    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }

  }

  return (
    <div className='p-4'>
      {/* profile upload and display image */}
      <div className='w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img
              alt={user.name}
              src={user.avatar}
              className='w-full h-full'
            />
          ) : (
            <FaRegUserCircle size={65} />
          )
        }
      </div>
      <button onClick={() => setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-yellow-200 
      hover:border-[var(--color-primary-100)] 
      hover:bg-[var(--color-primary-200)] px-3 py-1 
      cursor-pointer
      rounded-full mt-3'>Edit</button>

      {
        openProfileAvatarEdit && (
          <UserAvatarEdit close={() => setProfileAvatarEdit(false)} />
        )
      }

      {/* name , mobile , email , change password */}
      <form action="" className='my-4 grid gap-4 ' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id='name'
            placeholder='Enter Your name'
            className='p-2 bg-blue-50 outline-none 
          border focus-within:border-[var(--color-primary-100)] rounded'
            value={userData.name}
            name='name'
            onChange={handleOnChange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id='email'
            placeholder='Enter Your email'
            className='p-2 bg-blue-50 outline-none 
          border focus-within:border-[var(--color-primary-100)] rounded'
            value={userData.email}
            name='email'
            onChange={handleOnChange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="mobile"
            id='mobile'
            placeholder='Enter Your mobile No'
            className='p-2 bg-blue-50 outline-none 
          border focus-within:border-[var(--color-primary-100)] rounded'
            value={userData.mobile}
            name='mobile'
            onChange={handleOnChange}
            required
          />
        </div>

        <button className='border px-4 py-2 font-semibold 
        hover:bg-[var(--color-primary-100)] 
        border-[var(--color-primary-100)] 
        text-[var(--color-primary-100)]
         hover:text-neutral-800 rounded '>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default Profile
