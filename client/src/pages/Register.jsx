import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/Auth";
import Layout from "../components/Layouts/Layout";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    answer: "",
  });

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();

        alert("Registration successful");
        storeTokenInLS(responseData.token);

        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          answer: "",
        });

        navigate("/login");
      } else {
        const responseData = await response.json();
        alert("Registration failed: " + responseData.message || "An error occurred");
      }
    } catch (error) {
      alert("An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <section>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">REGISTER FORM</h4>
            
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInput}
                placeholder="Name"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Phone"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleInput}
                placeholder="Address"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="answer"
                value={user.answer}
                onChange={handleInput}
                placeholder="Answer"
              />
            </div>
            
            <button type="submit" className="btn btn-submit">
              Register Now
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};
