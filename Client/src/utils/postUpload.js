import axios from "axios";
import { sendNotification } from "./sendNotification";

const postUpload = async (
  img,
  ref,
  caption,
  handleCancel,
  setPostingState,
  setPostUploadReaction,
  navigate
) => {
  const email = JSON.parse(localStorage.getItem("email"));
  const username = JSON.parse(localStorage.getItem("username"));
  const token = JSON.parse(localStorage.getItem("token"));
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  try {
    let data = new FormData();
    data.append("img_file", img);
    data.append("email", email);
    data.append("username", username);
    data.append("token", token);
    data.append("user_id", user_id);
    data.append("caption", caption);

    const response = await axios.post(
      "http://localhost:8080/post/post_img",
      data
    );
    const result = await response.data;

    if (result.success) {
      setPostingState("Posted.");

      const posts = JSON.parse(localStorage.getItem("posts"));
      posts.push(result.postData._id);
      localStorage.setItem("posts", JSON.stringify(posts));

      if (!ref.current) {
        setTimeout(() => handleCancel(), 500);
        window.location.pathname === "/profile"
          ? window.location.reload()
          : navigate("/profile");
      } else {
        //notify user about post, that it is uploaded.
        const title = " ";
        const body = `Post uploaded.`;
        await sendNotification(title, body, user_id);
      }
    } else {
      setPostingState("Post");
      alert("Something went wrong!");
    }
  } catch (err) {
    setPostingState("Post");
    setPostUploadReaction(true);

    setTimeout(() => {
      setPostUploadReaction(false);
    }, 3000);
  }
};

export { postUpload };
