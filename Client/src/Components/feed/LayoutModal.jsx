/* eslint-disable react/prop-types */
import { useRef } from "react"
import { crossIcon } from "../../assets"
import { SvgInfoBox, useOutSideClick } from "..";

function LayoutModal({ hideModal, maxWidth = "sm:max-w-6xl", children }) {
  const ref = useRef();
  useOutSideClick(ref, hideModal);

  return (
    <div className='relative z-20' aria-labelledby="modal-title" role="dialog" aria-modal="true" >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center py-8 px-8 sm:p-0">
          <div className="w-screen sm:h-screen flex justify-center items-center">
            <div ref={ref} className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all md:w-full ${maxWidth}`}>
              {/* Hides the modal */}
              <div className="relative ">
                <div className="absolute flex justify-center items-center bg-transparent w-7 right-2 top-2">
                  <SvgInfoBox name='Close' position={'right-6'}>
                    <img onClick={hideModal} src={crossIcon} alt="" className="w-8 cursor-pointer invert" />
                  </SvgInfoBox>
                </div>
              </div>
              <div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutModal