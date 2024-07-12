/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { LayoutModal, SearchedUser } from '..';
import { search, crossIcon } from '../../assets';


function SearchModal({ setShowSearchModal }) {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [searchStatus, setSearchStatus] = useState(null);
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('search_history')));

  const handleCancel = () => setShowSearchModal(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setSearchStatus("Loading...");
  }

  const handleDeleteInput = () => {
    setSearchText('');
    setSearchStatus(null);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getSearchResults = async () => {
      if (searchText) {
        const response = await fetch(`http://localhost:8080/search?searched_text=${searchText}`, { signal });
        const result = await response.json();

        if (result.success) {
          if (result.result.length > 0) {
            setUserList(result.result);
            setSearchStatus("success");
          }
          else setSearchStatus("No User found!")
        }
        else {
          setSearchStatus("Something went wrong.");
        }
      }
    }
    getSearchResults();

    return () => {
      abortController.abort();
      setSearchStatus(null);
    }
  }, [searchText])

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-lg">

     <div>

    
      {/* Heading for Search Modal */}
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
        <h1 className="text-lg font-medium text-white">Search</h1>
      </div>

      {/* Search Bar */}
      <div>
        <div className='flex mx-6 mt-4 mb-6'>
          <div className='flex justify-center items-center pl-2 border border-[var(--blue)] border-r-transparent border-r-0 rounded-md rounded-r-none'>
            <img src={search} alt="" />
          </div>

          <input value={searchText} onChange={handleChange} placeholder='Search users' className='w-full px-3 py-2 border border-[var(--blue)] border-l-transparent border-x-0 outline-none' />

          <div className='flex justify-center items-center pr-2 border border-[var(--blue)] border-l-transparent border-l-0 rounded-md rounded-l-none'>
            {
              searchText.length > 0 &&
              <div className='border rounded-full bg-[var(--blue)]'>
                <img src={crossIcon} alt="" onClick={handleDeleteInput} className='cursor-pointer w-4 aspect-square invert p-[1px]' />
              </div>
            }
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className='mb-6'>
        <div className='px-8 overflow-y-scroll  custom-scroll-bar mx-2 h-80'>
          {
            !(searchText.length > 0) ?
              ((searchHistory && searchHistory.length > 0) ?
                <>
                  <div className='flex justify-start items-center -ml-3 -mt-1 mb-2'>
                    <p className='text-[var(--blue)] font-medium'>Recent</p>
                  </div>
                  {
                    [...searchHistory].reverse().map((user) =>
                      <SearchedUser key={user._id} user={user} setShowSearchModal={setShowSearchModal} forHistory={true} setSearchHistory={setSearchHistory} />
                    )
                  }
                </>
                :
                <>
                  <div className='flex justify-center items-center h-80'>
                    <p className='text-[var(--blue)] font-medium'>No Recent Searches</p>
                  </div>
                </>
              )
              :
              (searchStatus === "success" ?
                <>
                  {
                    userList.map((user) =>
                      <SearchedUser key={user._id} user={user} setShowSearchModal={setShowSearchModal} />
                    )
                  }
                </>
                :
                <>
                  <div className='flex justify-center items-center h-80'>
                    <p className='text-[var(--blue)] font-medium'>{searchStatus}</p>
                  </div>
                </>
              )
          }
        </div>
      </div>
      </div>
    </LayoutModal>
  )
}

export default SearchModal;