const checkLikedOrNot = async (postId, myUserId, setLiked) => {
  try {
    const response = await fetch(`http://localhost:8080/post/check_liked_or_not/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: myUserId }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    } else {
      const result = await response.json();
      setLiked(result.liked)
    }
  }
  catch (error) {
    console.error("Error checking liked status:", error);
  }
};

export { checkLikedOrNot };