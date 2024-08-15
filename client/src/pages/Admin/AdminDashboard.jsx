import { Outlet } from 'react-router-dom';
import AdminMenu from '../../components/Layouts/AdminMenu';
import Layout from '../../components/Layouts/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <AdminMenu />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <h1>Welcome to the Admin Dashboard</h1>
          {/* Render nested routes here */}
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
