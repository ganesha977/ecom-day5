import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import Layout from "../components/Layouts/Layout";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  // Handle the input field value
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Login successful");
        console.log("After login: ", responseData);
        setUser({ email: "", password: "" });
        storeTokenInLS(responseData.token);
        navigate("/");
      } else {
        const responseData = await response.json();
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="form-control"
              placeholder="Enter Your username"
              required
            /></div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="form-control"
              placeholder="Enter Your password"
              required
            /></div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};
