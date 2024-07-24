/* eslint-disable react/prop-types */
import { spinner } from '../../assets';

function Loader({ size = "" }) {
  return (
    <>
      <div className='w-full flex justify-center items-center'>
        <img src={spinner} alt="" className={`${size || "w-full max-w-[5rem] sm:max-w-[7rem]"} aspect-square`} />
      </div>
    </>
  )
}

export default Loader;