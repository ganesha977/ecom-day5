import { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import './table.css'; // Import the CSS file
import CategoryForm from '../../components/Form/CategoryForm';
import { toast } from 'react-toastify';
import {  } from "antd";
import Modal from 'antd/es/modal/Modal';
import { UpdateDisabled } from '@mui/icons-material';
const cate = () => {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const { AuthorizationToken } = useAuth(); // Destructure AuthorizationToken from useAuth
//   name useState
const [name, setName] = useState('');
  const [error, setError] = useState('');
const [visible,setVisible]=useState(false)
const [selected,setSelected]=useState(null)
const [updatename,setUpdatename]=useState('')














  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/api/v1/category/create-category', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken, // Ensure AuthorizationToken is prefixed with 'Bearer '
        },
        body: JSON.stringify({ name }) // Include your request payload here
      });
      
      const resdata = await response.json();
  ``
      if (response.ok) {
        // Success
        console.log(resdata?.name);
        toast.success(`${name}  category created successfully`);
        // Optionally, you can refresh the categories list
        getAllCategories();
      } else {
        // Handle errors
        toast.error(resdata.message || "Failed to create category");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the category");
    }
  };
  

  const getAllCategories = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/category/get-category', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization:  AuthorizationToken, // Prefix the token with 'Bearer '
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Categories:", data);
      if (data.success) {
        setCategories(data.category); // Set categories state with fetched data
      } else {
        setError(data.message); // Set error message if API response is not successful
      }

    } catch (error) {
      setError('Failed to fetch categories.');
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []); // Add AuthorizationToken to the dependency array


const handleupdate=async(e)=>{
  e.preventDefault();
  try {
    const response=await fetch(`http://localhost:7000/api/v1/category/update-category/${selected._id},`,{name:updatename})
const data=await response.json();
if(data.success){
  toast.success(`${updatename} is updated`);
  setSelected(null);
  setUpdatename("");
  setVisible(false);
  getAllCategories();
  }else{  
    toast.error("something went wrong")
  }

  } catch (error) {
   console.log(error) ;
   toast.error("seomthing went wrong")
  }

}



  return (
    <div className="container">
      <h1>Category List</h1>
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
      {error && <p className="error">{error}</p>}
      {categories.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                {/* <td>{category.slug}</td> */}
                <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);setUpdatename(category.name );
                  setSelected(category)
                }} >edit</button>
                <button className='btn btn-danger ms-2'>Delete</button>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found</p>
      )}

      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}
>
  <CategoryForm value={updatename} setValue={setUpdatename} handleSubmit={handleupdate} />
  
  
  </Modal>    </div>
    
  );
};

export default cate;
