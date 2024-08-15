import { useState, useEffect } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./client/src/store/Auth";
import { toast } from "react-toastify";

const { Option } = Select;

const CreateProduct = () => {
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all categories
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
        console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.log('Failed to fetch categories.');
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []); // Add AuthorizationToken if needed





  const handleCreate = async (e) => {
   e.preventDefault();
   
   try {
     const productData = new FormData();
     productData.append("name", name);
     productData.append("description", description);
     productData.append("price", price);
     productData.append("originalPrice", originalPrice);
     productData.append("discountedPrice", discountedPrice);
     productData.append("discount", discount);
     productData.append("rating", rating);
     productData.append("quantity", quantity);
     productData.append("photo", photo);
     productData.append("category", category);
     productData.append("shipping", shipping);
 
     const response = await fetch("http://localhost:7000/api/v1/product/create-product", {
       method: "POST",
       headers: {
         Authorization: AuthorizationToken,
       },
       body: productData,
     });
 
     // Check if response is not ok and handle it
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
 
     // Handle JSON parsing errors
     const data = await response.json().catch(() => {
       throw new Error('Failed to parse JSON');
     });
 
     if (data.success) {
       toast.success("Product Created Successfully");
       navigate("/admin/product");
     } else {
       toast.error(data?.message || "Failed to create product");
     }
   } catch (error) {
     console.error(error);
     toast.error("Something went wrong");
   }
 };
 





  return (
    <>
      <div className="col-md-8">
        <h1>Create Product</h1>
        <div className="m-1 w-75">
          <Select 
            variant="unstyled" 
            placeholder="Enter a category" 
            size="large" 
            showSearch 
            className="form-select mb-3" 
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((c) => (
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
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <textarea
              value={description}
              placeholder="Write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={originalPrice}
              placeholder="Write the original price"
              className="form-control"
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={discountedPrice}
              placeholder="Write the discounted price"
              className="form-control"
              onChange={(e) => setDiscountedPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={discount}
              placeholder="Write the discount"
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={rating}
              placeholder="Write the rating"
              className="form-control"
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Select
              variant="unstyled"
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
