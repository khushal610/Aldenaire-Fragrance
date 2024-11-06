import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Manage_products() {

    const [productData, setProductData] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/get-products');
            setProductData(res.data);
        } catch (err) {
            console.log(err);
        }
        };

        fetchProducts();
    }, [])

  return (
    <div className='product-viewer-body flex'>
        <div className='products-view-container pt-10 p-3 w-full'>
            <div className="product-items-holder relative overflow-x-scroll p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 w-2/12">
                                Product ID
                            </th>
                            <th className="px-6 py-3 w-2/12">
                                Product name
                            </th>
                            <th className="px-6 py-3 w-2/12">
                                Product Image
                            </th>
                            <th className="px-6 py-3 w-2/12">
                                Description
                            </th>
                            <th className="px-6 py-3 w-2/12">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {productData.map((element, index) => (
                        <tr key={index}>
                        <td className='px-6 py-4'>{element.productID}</td>
                        <td className="px-6 py-4">{element.productName}</td>
                        <td className="px-6 py-4">
                            <img src={element.productImgUrl} width={"40%"} />
                        </td>
                        <td className="px-6 py-4">{element.productDescription}</td>
                        <td className="px-6 py-4">{element.productPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  )
}

export default Manage_products
