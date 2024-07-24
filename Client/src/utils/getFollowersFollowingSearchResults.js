const getFollowersFollowingSearchResults = async (searchText, setUsersList, setStatus, name) => {
  setStatus("Loading...");
  let searchIn = name === 'following' ? 'followers' : "following";
  const token = JSON.parse(localStorage.getItem('token'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));

  try {
    if (searchText) {
      const response = await fetch(`http://localhost:8080/profile/search_following_followers/${user_id}/${searchText}?search_in=${searchIn}`, {
        method: "GET",
        headers: {
          authorization: token,
        }
      });
      const result = await response.json();

      if (result.success) {
          if (result.searchedUsers.length > 0) {
            setUsersList(result.searchedUsers);
            setStatus("success");
          } else setStatus(`No ${name} found!`);
      }
      else {
        setStatus(`No ${name} found!`);
      }
    }
    else setStatus(null);
  }
  catch (err) {
    setStatus("Something went wrong.");
  }
}

export { getFollowersFollowingSearchResults }