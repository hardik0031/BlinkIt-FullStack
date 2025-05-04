import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import Loading from '../components/Loading.jsx'
import ProductCardAdmin from '../components/ProductCardAdmin.jsx'
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setProductData(responseData.data)
        if (responseData.totalNoPage) {
          setTotalPageCount(responseData.totalNoPage)
        }

      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300);

    return () => {
      clearTimeout(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full w-full max-w-56 min-w-24 ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border border-blue-50 focus-within:border-[var(--color-primary-200)]'>
          <IoSearch size={20} />
          <input
            type='text'
            placeholder='Search product here...'
            className='h-full w-full outline-none bg-transparent'
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      <div className='p-4 bg-blue-50'>

        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 '>
            {
              // eslint-disable-next-line no-unused-vars
              productData.map((p, index) => {
                return (
                  <ProductCardAdmin data={p} fetchProductData={fetchProductData}/>
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-between my-4'>

          {page > 1 && (
            <button onClick={handlePrevious} className='border rounded-2xl border-[var(--color-primary-200)] px-4 py-1 hover:bg-[var(--color-primary-200)]'>
              Previous
            </button>
          )}

          <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border rounded-2xl  border-[var(--color-primary-200)] px-4 py-1 hover:bg-[var(--color-primary-200)]'>Next</button>
        </div>

      </div>

    </section>
  )
}

export default ProductAdmin
