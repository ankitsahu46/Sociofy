const handlePostDelete = async (postId, token, setState) => {
  setState('Deleting...')
  try {
    const response = await fetch(`http://localhost:8080/profile/delete_post/${postId}`, {
      method: "DELETE",
      headers: {
        authorization: token
      }
    });

    const result = await response.json();
    if (result.success) {
      console.log('Post Deleted.');
      setState('Deleted.');
      window.location.reload();
    }
    else {
      console.log("Couldn't Delete Post. Please try again later.");
      setState('Delete');
    }
  }
  catch (err) {
    console.log("Couldn't Delete Post. Something went wrong. Error: ", err);
    setState('Delete');
  }
}

export { handlePostDelete };