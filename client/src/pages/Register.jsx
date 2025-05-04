import React, { useState,} from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowconfirmPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmpassword) {
      toast.error(
        "password and confirm password must be same"
      )
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmpassword: ""
        })
        navigate("/login")
      }

      console.log("response", response)
    } catch (error) {
      AxiosToastError(error)
    }



  }

  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p>Welcome to Blinkit</p>

        <form className="grid gap-4 mt-6 " onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-500'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-500'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="password">Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center gap-10 focus-within:border-yellow-500'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none bg-white'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <IoEye />
                  ) : (
                    <FaEyeSlash />
                  )
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="confirmpassword">Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center gap-10 focus-within:border-yellow-500'>
              <input
                type={showconfirmPassword ? "text" : "password"}
                id='confirmpassword'
                className='w-full outline-none bg-white'
                name='confirmpassword'
                value={data.confirmpassword}
                onChange={handleChange}
                placeholder='Enter your confirm password'
              />
              <div onClick={() => setShowconfirmPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showconfirmPassword ? (
                    <IoEye />
                  ) : (
                    <FaEyeSlash />
                  )
                }
              </div>
            </div>
          </div>

          <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded 
          font-semibold my-4 tracking-wide`}>Register</button>
        </form>

        <p>
          Already have account ? <Link to={"/login"}
          className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>


    </section>
  )
}

export default Register
