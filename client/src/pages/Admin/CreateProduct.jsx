import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/Auth';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  
  // Define state variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const { AuthorizationToken } = useAuth();

  const getAllCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:7000/api/v1/category/get-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error("Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Failed to fetch categories.");
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    if (AuthorizationToken) {
      getAllCategories();
    }
  }, [AuthorizationToken]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);

      const response = await fetch(
        "http://localhost:7000/api/v1/product/create-product",
        {
          method: "POST",
          headers: {
            Authorization: AuthorizationToken,
          },
          body: productData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/admin"); // Redirect to the products list or another page
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="col-md-9">
      <h1>Create Product</h1>
      <form onSubmit={handleCreate}>
        <div className="m-1">
          <Select
            variant="default" // Updated prop
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setCategory(value)}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded preview"
                  height="200px"
                  className="img-fluid"
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Product name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Product description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              variant="default" // Updated prop
              placeholder="Select shipping"
              size="large"
              className="form-select"
              onChange={(value) => setShipping(value)}
              value={shipping || undefined} // Ensure value is either a valid option or undefined
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
