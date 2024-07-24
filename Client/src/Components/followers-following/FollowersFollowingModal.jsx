/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { UserListItem, LayoutModal, Loader, SearchBox } from '..';
import { getFollowersFollowingList, getFollowersFollowingSearchResults } from '../../utils';

function FollowersFollowingModal({ setShowFollowersFollowingModal, name, setUserData }) {
  const [usersList, setUsersList] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleCancel = () => setShowFollowersFollowingModal(false);
  const handleChange = (e) => setSearchText(e.target.value);

  const handleDeleteInput = () => {
    setSearchText('');
    setStatus(null);
  }

  useEffect(() => {
    if (searchText) {
      getFollowersFollowingSearchResults(searchText, setUsersList, setStatus, name);
    }
    else {
      getFollowersFollowingList(setUsersList, setStatus, name);
    }
  }, [searchText, name]);

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-lg">
      <div className='sm_max:min-w-[70vw] w-full'>
        {/* Heading for Followers/following Modal */}
        <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
          <h1 className="text-lg font-medium text-white">{name}</h1>
        </div>

        <SearchBox searchedText={searchText} handleChange={handleChange} handleDeleteInput={handleDeleteInput} />

        <div className=''>
          <div className='px-6 sm:px-8 mb-4 overflow-y-scroll  custom-scroll-bar mx-2 min-h-[60vh] max-h-[60vh]'>
            {/* Followers/Following List */}
            {
              usersList.length > 0 && status === 'success' ?
                (usersList.map((user) =>
                  <UserListItem key={user._id} user={user} handleCancel={handleCancel} name={name} setUsersList={setUsersList} usersList={usersList} setUserData={setUserData} />
                ))
                :
                (<>
                  <div className='flex justify-center items-center h-80'>
                    <p className='text-[var(--blue)] font-medium'>{status === 'Loading...' ? <Loader /> : ((status === "success" && usersList.length === 0) ? `You have no ${name}` : status)}</p>
                  </div>
                </>)
            }
          </div>
        </div>
      </div>
    </LayoutModal>
  )
}

export default FollowersFollowingModal;