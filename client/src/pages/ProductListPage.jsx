/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allsubCategory)
  const [displaySubCategory, setDisplaySubCategory] = useState([])



  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          limit: 10,
          page: page
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })
      return filterData ? filterData : false
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto lg:px-6 grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
        {/* sub category*/}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustome bg-white py-2'>
          {
            // eslint-disable-next-line no-unused-vars
            displaySubCategory.map((s, index) => {
              const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`w-full p-2 bg-white lg:flex items-center lg:w-full 
                lg:h-16 box-border lg:gap-4 border-b border-blue-100 hover:bg-green-300 cursor-pointer
                ${subCategoryId === s._id ? "bg-green-100" : ""}
                
                
                `}>

                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                    <img
                      src={s.image}
                      alt='subCategory'
                      className='w-14 lg:h-14 lg:w-14 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>




        {/* product */}
        <div className='top-20 sticky'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

            <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
              <div className='grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 p-4 gap-4'>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategpry" + index}
                      />
                    )
                  })
                }
              </div>
            </div>


            {
              loading && (
                <Loading />
              )
            }
          </div>
        </div>


      </div>
    </section>
  )
}

export default ProductListPage
