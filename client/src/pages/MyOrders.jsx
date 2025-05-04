import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order", orders);

  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Orders</h1>
      </div>
      {
        !orders[0] && (
          <NoData />
        )
      }
      {
        orders.map((order, index) => {
          return (
            <div key={order._id + index + "order"} className='border border-blue-100 rounded p-4 text-sm'>
              <p>Order No : {order?.orderId}</p>
              <div className='flex gap-3'>
                <img
                  src={order?.product_details?.image[0]}
                  className='w-14 h-14'
                />
                <p className='font-medium py-4'>{order?.product_details?.name}</p>
              </div>
              <p className='font-semibold px-2 py-2'>{DisplayPriceInRupees(order?.totalAmt)}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders
