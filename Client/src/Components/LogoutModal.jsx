/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LayoutModal } from ".";

function LogoutModal({ setShowLogoutModal }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowLogoutModal(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-lg">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
        <h1 className="text-lg font-medium text-white">Logout</h1>
      </div>
      <div className="min-h-[50px]">
        <p className="mx-8 my-8 font-bold text-[var(--blue-dark)]">
          Are you sure, you want to Logout?
        </p>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" onClick={handleLogout} className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] hover:from-[var(--blue-hover)] hover:to-[var(--blue-semidark-hover)] px-6 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-all">Yes</button>
        <button type="button" onClick={handleCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
      </div>
    </LayoutModal>
  )
}

export default LogoutModal;
