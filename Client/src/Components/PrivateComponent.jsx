import { Outlet, Navigate } from 'react-router-dom';
import { Header } from '../pages';

function PrivateComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
    // <Navigate to="/login" />
  )
}

export default PrivateComponent