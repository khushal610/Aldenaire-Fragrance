import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Products() {

  const [productID,setProductID] = useState('')
  const [productName, setProductName] = useState('')
  const [productImgUrl, setProductImgUrl] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')

  

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/api/add-products', { productID,productName, productImgUrl, productPrice, productDescription })
        .then(() => { console.log('Form Submitted') })
        .catch((err) => { 
          console.log(err); 
          // if(err.response && err.response.status === 400){
          //   alert("Product Id or product is alerady Exist");
          // }
        })

        if(result && result.status === 200){
          alert('Product Added Successfully');
        }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.delete(`http://localhost:3000/api/delete-products/${productID}`)
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 400) {
            alert('Product Not Found');
          }
        });
  
      if (result && result.status === 200) {
        alert('Product deleted successfully');
        setProductData(productData.filter(product => product.productID !== productID));
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return (
    <div>
      {/* Add Products from admin panel */}
      <div className='add-products-form-container flex items-center justify-center'>
          <form method='POST' onSubmit={addProduct} autoComplete='off'>
              <table className='mt-5 add-product-table'>
                <thead>
                  <tr>
                    <td>
                      <p>Product ID</p>
                    </td>
                    <td>
                      <input 
                        className='h-8 border border-slate-900 rounded-md outline-none p-2 w-full'
                        type="text" 
                        name='productID' 
                        value={productID} 
                        onChange={(e) => setProductID(e.target.value)} 
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Product Name</p>
                    </td>
                    <td>
                      <input 
                        className='h-8 border border-slate-900 rounded-md outline-none p-2 w-full'
                        type="text" 
                        name='productName' 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required
                      />
                    </td>
                  </tr>
                </thead>
                <tr>
                  <td>
                    <p>Product Image Url</p>
                  </td>
                  <td>
                  <input 
                      className='h-8 border border-slate-900 rounded-md outline-none p-2 w-full'
                      type="text" 
                      name='productName' 
                      value={productImgUrl} 
                      onChange={(e) => setProductImgUrl(e.target.value)} 
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Product Price</p>
                  </td>
                  <td>
                    <input 
                      className='h-8 border border-slate-900 rounded-md outline-none p-2 w-full'
                      type="text" 
                      name='productName' 
                      value={productPrice} 
                      onChange={(e) => setProductPrice(e.target.value)} 
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Product Description</p>
                  </td>
                  <td>
                    <textarea 
                      className='resize-none border border-slate-900 rounded-md outline-none p-2'
                      type="text"
                      name='productName' 
                      cols="50"
                      rows="3"
                      value={productDescription} 
                      onChange={(e) => setProductDescription(e.target.value)} 
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className='text-white bg-blue-600 px-3 py-2 rounded-md hover:text-blue-600 hover:border hover:border-blue-600 hover:bg-white transition-all duration-300 hover:shadow-md'>Add Product</button>  
                  </td>
                  <td>
                    <button 
                    onClick={handleDeleteProduct}
                    className='text-white bg-red-600 px-3 py-2 rounded-md hover:text-red-600 hover:border hover:border-red-600 hover:bg-white transition-all duration-300 hover:shadow-md'>Remove Product</button>  
                  </td>
                </tr>
              </table>
          </form>
      </div>

      
    </div>
  )
}

export default Products