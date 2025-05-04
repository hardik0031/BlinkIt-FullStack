/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { valideURLConvert } from '../utils/valideURLConvert'
import { useSelector } from 'react-redux'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allsubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: { id }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const handleRedirectProductPage = () => {
        const subcategory = subCategoryData.find(sub =>
            sub.category.some(c => c._id === id)
        )

        // if (!subcategory) {
        //     return null
        // }

        return `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    }

    const redirectURL = handleRedirectProductPage()

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg px-5 md:text-xl'>{name}</h3>
                {redirectURL && (
                    <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
                )}
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                        loading &&
                        loadingCardNumber.map((_, index) => (
                            <CardLoading key={"CategoryWiseProudctDisplay123" + index} />
                        ))
                    }

                    {
                        data.map((p, index) => (
                            <CardProduct data={p} key={p._id + "CategoryWiseProudctDisplay" + index} />
                        ))
                    }
                </div>

                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
