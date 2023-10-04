import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App"

const Product = ({ product, getProducts }) => {

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Do you really want to delete the product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  })
  // confirm delete 
  if(result.isConfirmed) {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`)
      toast.success('Deleted product successfully')
    getProducts()
    } catch(err) {
      toast.error(err.message)
    }
  }
}
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={product.image} className="w-full h-28 object-cover"  />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{product.name}</h2>
     
        <div className="text-sm m-2">Quantity: {product.quantity}</div>
        <div className="text-sm m-2">Price: ${product.price}</div>

        <div className="mt-2 flex gap-4">
          <Link to={`/edit/${product._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-600 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-500 hover:cursor-pointer">Edit</Link>
          <button className="inline-block w-full text-center shadow-md text-sm bg-blue-900 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-900 hover:cursor-pointer" onClick={() => deleteProduct(product._id)} >
            Remove
          </button>
        </div>
      </div>
    </div>
   
    
  )
}

export default Product
