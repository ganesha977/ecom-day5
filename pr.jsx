// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Spinner from "../Spinner";
// import { useAuth } from "../../context/AuthContext";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const response = await fetch("/api/v1/auth/user-auth", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": auth?.token
//           }
//         });
//         const data = await response.json();
//         if (data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//         setOk(false);
//       }
//     };

//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   return ok ? <Outlet /> : <Spinner />;
// }
