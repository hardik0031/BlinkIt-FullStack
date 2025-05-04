import React from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { IoMdCart } from "react-icons/io";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItem[0] && (
                    <div className='sticky bottom-4 p-2'>
                        <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between lg:hidden'>
                            <div className='flex items-center gap-2'>
                                <div className='p-2 bg-green-500 rounded w-fit'>
                                    <IoMdCart />
                                </div>
                                <div className='text-sm'>
                                    <p>{totalQty} items</p>
                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>

                            <Link to={"/cart"} className='flex items-center gap-1'>
                                <span className='text-sm'>View Cart</span>
                                <FaCaretRight />
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CartMobileLink;
