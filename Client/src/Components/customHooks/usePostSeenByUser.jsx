import { useEffect, useState } from "react";

const usePostSeenByUser = (ref, postId) => {
  const [seenPost, setSeenPost] = useState(false);
  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const reference = ref.current;

    const postSeenByUser = async () => {
      if (seenPost) return;
      const response = await fetch(`http://localhost:8080/post/post_seen_by_user/${postId}/${myUserId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      const result = await response.json();

      if (result.success) setSeenPost(true);
    }


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) postSeenByUser();
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.55 }
    );

    if (reference) observer.observe(reference);

    return () => {
      if (reference) observer.unobserve(reference);
    };
  }, [ref, postId, myUserId, token, seenPost]);

}

export default usePostSeenByUser;