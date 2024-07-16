/* eslint-disable react/prop-types */
import { Outlet, Navigate } from 'react-router-dom';
import { Header } from '../../pages';

function PrivateComponent() {
  const auth = localStorage.getItem('token');

  return (
    <>
      <Header />
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default PrivateComponent