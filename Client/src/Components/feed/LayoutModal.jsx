/* eslint-disable react/prop-types */
import { crossIcon } from "../../assets"

function LayoutModal({ hideModal, children }) {
  return (
    <div className='relative z-10' aria-labelledby="modal-title" role="dialog" aria-modal="true" >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Hides the modal */}
          <div className="absolute w-screen h-screen">
            <img onClick={hideModal} src={crossIcon} alt="" className="relative w-8 left-[96vw] top-[1vw] cursor-pointer invert bg-gray-400 rounded-lg" />
          </div>

          <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutModal