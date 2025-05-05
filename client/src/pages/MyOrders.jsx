import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order", orders);

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='bg-white shadow-md p-4 rounded-md mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Orders</h1>
      </div>

      {
        (!orders || orders.length === 0) ? (
          <NoData />
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id + index + "order"}
                className='bg-white border border-blue-100 shadow-sm rounded-md p-4 space-y-3'
              >
                <div className='flex items-center justify-between'>
                  <p className='text-gray-700 text-sm'>Order No: <span className="font-medium">{order?.orderId}</span></p>
                  <p className='text-sm font-semibold text-green-600'>{DisplayPriceInRupees(order?.totalAmt)}</p>
                </div>

                <div className='flex items-center gap-4'>
                  <img
                    src={order?.product_details?.image[0]}
                    alt="Product"
                    className='w-16 h-16 object-cover rounded-md border'
                  />
                  <div>
                    <p className='text-gray-800 font-semibold'>{order?.product_details?.name}</p>
                    <p className='text-gray-500 text-xs'>Quantity: {order?.quantity || 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default MyOrders
