import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css";
// import './admin.css'
import { AuthProvider } from './store/Auth.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-pro-sidebar/dist/css/styles.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ToastContainer />

     <AuthProvider>
    <App />

  </AuthProvider>
  </React.StrictMode>,
)
