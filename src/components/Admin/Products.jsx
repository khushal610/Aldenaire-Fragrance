import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Products() {

  const [productID,setProductID] = useState('')
  const [productName, setProductName] = useState('')
  const [productImgUrl, setProductImgUrl] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  
  const [totalProducts,setTotalProducts] = useState([]);
  const [productData,setProductData] = useState([]);

  const fetchTotalProducts = async() => {
    const result = await axios.get('http://localhost:3000/api/get-products');
    setTotalProducts(result.data);
  }
  useEffect(() => {
    fetchTotalProducts();
  },[])

  const findProducts = async() => {
    try{
      // console.log(productID);
      const result = await axios.post('http://localhost:3000/api/find-products-from-admin',{ productID })
      .catch((error) => {
        alert("Product Not Found",error);
      });
      // console.log(result.data.data);
      setProductData(result.data.data);
      setProductName(productData.productName);
      setProductImgUrl(productData.productImgUrl);
      setProductPrice(productData.productPrice);
      setProductDescription(productData.productDescription);
    }catch(error){
      console.log(error);
    }
  }

  const FetchProductID = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProductID(value);
  
    if (value === "") {
      setProductName('');
      setProductImgUrl('');
      setProductPrice('');
      setProductDescription('');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/api/add-products', { productID,productName, productImgUrl, productPrice, productDescription }).catch((err) => { console.log(err) });
        console.log(result);
        // alert('Product Added Successfully');
        if(result.data && result.data.status === "ok"){
          alert('Product Added Successfully');
          fetchTotalProducts();
          setProductID('');
          setProductName('');
          setProductImgUrl('');
          setProductPrice('');
          setProductDescription('');
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
        fetchTotalProducts();
        setProductData(productData.filter(product => product.productID !== productID));
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const updateProduct = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:3000/api/update-product`,{ productID,productName,productImgUrl,productPrice,productDescription })
      .catch((err) => { console.log(err) });
      alert('Product details are updated');
      console.log(result.data);
      setProductID('');
      setProductName('');
      setProductImgUrl('');
      setProductPrice('');
      setProductDescription('');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      {/* Add Products from admin panel */}
      <div className='add-products-form-container flex items-center justify-center'>
          <form method='POST' autoComplete='off'>
            <h2>Total number of products are : {totalProducts.length}</h2>
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
                        onChange={(e) => FetchProductID(e)} 
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
                {/* <tr>
                  <td> */}
                  {/* </td>
                  <td className='flex gap-4'> */}
                  {/* </td>
                </tr> */}
              </table>
              <div className='flex gap-4'>
                <button 
                  className='text-white bg-blue-600 px-3 py-2 rounded-md hover:text-blue-600 hover:border hover:border-blue-600 hover:bg-white transition-all duration-300 hover:shadow-md'
                  onClick={() => findProducts()}
                >Find Product</button>  
                <button className='text-white bg-blue-600 px-3 py-2 rounded-md hover:text-blue-600 hover:border hover:border-blue-600 hover:bg-white transition-all duration-300 hover:shadow-md'
                  onClick={(e) => addProduct(e)}
                >Add Product</button>  
                  <button 
                  onClick={(e) => handleDeleteProduct(e)}
                  className='text-white bg-red-600 px-3 py-2 rounded-md hover:text-red-600 hover:border hover:border-red-600 hover:bg-white transition-all duration-300 hover:shadow-md'>Remove Product</button>  
                  <button 
                  onClick={(e) => updateProduct(e)}
                  className='text-white bg-red-600 px-3 py-2 rounded-md hover:text-red-600 hover:border hover:border-red-600 hover:bg-white transition-all duration-300 hover:shadow-md'>Update Product</button>  
              </div>
          </form>
      </div>

      
    </div>
  )
}

export default Products