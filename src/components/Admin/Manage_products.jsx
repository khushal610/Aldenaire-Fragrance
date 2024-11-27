import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";

function Manage_products() {

    const [productData, setProductData] = useState([])

    const fetchProducts = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/get-products')
        .catch((error) => { 
            alert('Product Not Found',error);
        });
        setProductData(res.data);
    } catch (err) {
        console.log(err);
    }
    };

    useEffect(() => {
        fetchProducts();
    }, [])


    const deleteProduct = async(e,id) => {
        e.preventDefault();
        try {
            let deleteConfirmation = confirm('you really want to delete this product');
            if(deleteConfirmation){
                const response = await axios.post('http://localhost:3000/api/delete-products-from-admin',{ id })
                .catch((e) => { console.log(e) });
                if(response.data.status === "ok" && response.data.data){
                    console.log(id);
                    console.log(response);
                    alert('Product deleted successfully');
                    fetchProducts();
                }
                else{
                    alert('Some error occur to delete the product');
                }
            }
            else{
                alert('process abort');
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='product-viewer-body flex flex-col'>
        <div className='products-view-container pt-10 p-3 w-full'>
                <h2>Total number of products : {productData.length}</h2>
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
                            <th className="px-6 py-3 w-1/12">
                                Delete
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
                        <td className="px-6 py-4"><MdDelete className='cursor-pointer' onClick={(e) => deleteProduct(e,element._id)} /></td>
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
