import { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import './table.css'; // Import the CSS file
import CategoryForm from '../../components/Form/CategoryForm';
import { toast } from 'react-toastify';
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const { AuthorizationToken } = useAuth(); // Destructure AuthorizationToken from useAuth
  const [name, setName] = useState(''); // State for name
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState(''); // Corrected variable name to updateName

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/api/v1/category/create-category', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({ name })
      });

      const resdata = await response.json();

      if (response.ok) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
      } else {
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
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setCategories(data.category);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch categories.');
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []); // Add AuthorizationToken to the dependency array if it changes frequently

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/api/v1/category/update-category/${selected._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({ name: updateName })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };









  const handledelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <div className="container">
      <h1>Category List</h1>
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
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
                <td>
                  <button className='btn btn-primary ms-2' onClick={() => {
                    setVisible(true);
                    setUpdateName(category.name);
                    setSelected(category);
                  }}>Edit</button>
                  <button className='btn btn-danger ms-2' onClick={() => handledelete(category._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found</p>
      )}
  
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
      </Modal>
    </div>
  );
}  

export default CreateCategory;
