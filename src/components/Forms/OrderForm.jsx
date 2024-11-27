import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import GooglePayButton from '@google-pay/button-react';
import { useNavigate } from 'react-router-dom';

function OrderForm() {

    const [userName,setUserName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [contact,setContact] = useState('');
    const [location,setLocation] = useState('');
    const [paymentType,setPaymentType] = useState('');
    const navigate = useNavigate();
    let totalPrice = 0;
    let payableAmount = 0;

    const [productData,setProductData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async() => {
            try {
                const productDetails = await axios.post("http://localhost:3000/api/get-cart-data",{ email });
                
                if(productDetails.data && productDetails.data.data){
                    const userInfo = productDetails.data.data[0].userInfo;
                    setUserName(userInfo.username);
                    setUserEmail(userInfo.email);
                }
                
                setProductData(productDetails.data.data);
                console.log(productDetails.data.data[0].userInfo);
                // console.log(productDetails.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrderData();
    },[])

    const Token = window.localStorage.getItem("token");
    const decodeToken = jwtDecode(Token);
    const email = decodeToken.email;

    const makeOrder = async (e) => {
        e.preventDefault();
        try {

            if(!paymentType){
                alert('Please select the payment type');
            }

            const orderData = {
                username: userName,
                email: userEmail,
                products: productData.map((item) => ({
                    productName: item.productInfo.productName,
                    productPrice: item.productInfo.productPrice,
                    productImgUrl: item.productInfo.productImgUrl,
                    quantity: item.quantity
                })),
                contact: contact,
                location: location,
                paymentType: paymentType
            };
            
            const result = await axios.post('http://localhost:3000/api/create-order', orderData)
            .catch((err) => console.log(err));

            if (result.status === 200) {
                const deleteCartData = await axios.post('http://localhost:3000/api/delete-cart-after-order', { email })
                .catch((err) => console.log(err));
                console.log(deleteCartData.data.data);
                alert('Your order was placed successfully');
                navigate('/profile/orders');
            } else {
                alert('There is some server issue');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-full flex gap-2 justify-around p-10'>
        <div className='order-form-container w-8/12 p-10 flex items-center justify-center'>
            <form method='post' className='w-full flex items-center justify-center gap-3 relative'>
                {/*---------------------------------------------------------------------------------------------------------------------------------
                                                order form 1
                -------------------------------------------------------------------------------------------------------------------------------*/}
                <div className='order-form-1 w-10/12 flex flex-col gap-3'>
                    <div>
                        <input 
                            type="text" 
                            placeholder='Name'
                            className='border border-black p-2 w-full'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="email" 
                            placeholder='Email'
                            className='border border-black p-2 w-full'
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder='Phone'
                            className='border border-black p-2 w-full'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <textarea 
                            rows={"5"}
                            cols={"22"}
                            placeholder='Please enter order receiving location'
                            className='border border-black p-2 w-full resize-none'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                </div>
                 {/*---------------------------------------------------------------------------------------------------------------------------------
                                                order form 2
                -------------------------------------------------------------------------------------------------------------------------------*/}
                <div className='order-form-2 w-10/12 flex flex-col gap-3'>
                    {/* <div>
                    <p>Default Order Id</p>
                    </div> */}
                    <div className='flex items-center gap-4'>
                        Payment Type :
                        <div className='flex items-center gap-2'>
                            Cash on Delivery
                            <input 
                                type="radio" 
                                name='paymentMode'
                                value={"Cash on Delivery"}
                                onChange={(e) => setPaymentType(e.target.value)}
                            />
                        </div>
                        {/* <div className='flex items-center gap-2'>
                            UPI Payment
                            <input 
                                type="radio" 
                                name='paymentMode'
                                value={"UPI Payment"}
                                onChange={(e) => setPaymentType(e.target.value)}
                            />
                        </div> */}
                    </div>
                    {/* <div>
                    <p>Default Discount price</p>
                    </div> */}
                    {/* <div>
                        <p>Total Price</p>
                    </div> */}
                    <div>
                    {paymentType == "UPI Payment" ? 
                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                        gateway: 'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                    },
                                    },
                                },
                                ],
                                merchantInfo: {
                                    merchantId: 'MjsiwG82916195153070',
                                    merchantName: 'DHRUMIL PARESHKUMAR SONI',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: payableAmount.toFixed(2),
                                    currencyCode: 'INR',
                                    countryCode: 'IN',
                                },
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                            />
                            :
                            <button 
                                className='border uppercase border-black p-2 rounded'
                                onClick={makeOrder}
                            >
                                Place Order!
                            </button>
                        }
                    </div>
                </div>
            
            </form>
        </div>

        <div className='productInfoContainer w-3/12'>
            <div className='productDetails flex flex-col items-center justify-center'>
                <p>product information</p>
                <div className='product-item-container w-full h-72 overflow-x-scroll flex flex-col gap-4 p-2' >
                    <table className='border border-black'>
                        <thead>
                            <tr>
                                <th className='w-3/12'>Product Name</th>
                                <th className='w-3/12'>Image</th>
                                <th className='w-3/12'>Quantity</th>
                                <th className='w-3/12'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            productData.map((element,index) => {
                                totalPrice = totalPrice + Number(element.productInfo.productPrice)
                                return <tr className='text-center' key={index}>
                                        <td className='w-3/12'>{element.productInfo.productName}</td>
                                        <td className='w-3/12 '><img src={element.productInfo.productImgUrl} width={"90%"}/></td>
                                        <td className='w-3/12'>{element.quantity}</td>
                                        <td className='w-3/12'>{element.productInfo.productPrice}</td>
                                    </tr>    
                            })
                        }
                        </tbody>
                    </table>
                </div>
                    <p className='flex justify-end'>Total Payable Amount : ₹{payableAmount = totalPrice}</p>
            </div>
        </div>
    </div>
  )
}

export default OrderForm



