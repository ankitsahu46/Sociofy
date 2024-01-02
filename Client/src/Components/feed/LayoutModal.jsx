/* eslint-disable react/prop-types */
import { crossIcon } from "../../assets"

function LayoutModal({ hideModal, maxWidth = "sm:max-w-6xl", children }) {
  return (
    <div className='relative z-10' aria-labelledby="modal-title" role="dialog" aria-modal="true" >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Hides the modal */}
          <div className="absolute w-screen h-screen  ">
            <div className="relative flex justify-center items-center bg-gradient-to-b from-[var(--blue-semidark2)] to-[var(--blue)] rounded-lg w-10 aspect-square left-[96vw] top-[1vw]">
              <img onClick={hideModal} src={crossIcon} alt="" className="w-8 cursor-pointer invert" />
            </div>
          </div>

          <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 md:w-full ${maxWidth}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutModal