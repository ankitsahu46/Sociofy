/* eslint-disable react/prop-types */
import { crossIcon, search } from "../../assets";

function SearchBox({ searchedText, handleChange, handleDeleteInput }) {
  return (
    <div className='w-full px-4 sm:px-6'>
      <div className='flex my-4'>
        <div className='flex justify-center items-center pl-2 border border-[var(--blue)] border-r-transparent border-r-0 rounded-md rounded-r-none'>
          <img src={search} alt="" />
        </div>

        <input value={searchedText} onChange={handleChange} placeholder='Search users' className='w-full px-3 py-2 border border-[var(--blue)] border-l-transparent border-x-0 outline-none' />

        <div className='flex justify-center items-center pr-2 border border-[var(--blue)] border-l-transparent border-l-0 rounded-md rounded-l-none'>
          {
            searchedText.length > 0 &&
            <div className='border rounded-full bg-[var(--blue)]'>
              <img src={crossIcon} alt="" onClick={handleDeleteInput} className='cursor-pointer w-4 aspect-square invert p-[1px]' />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchBox