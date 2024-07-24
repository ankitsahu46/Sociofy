import userData from "../../models/userData.js";

const searchFollowersFollowing = async (req, res) => {
  const { searched_text, user_id } = req.params;
  const searchIn = req.query.search_in;
  const query = {
    username: { $regex: searched_text, $options: "m" },
  };
  query[searchIn] = user_id;

  try {
    const result = await userData
      .find(query)
      .select("username name img");

    if (result.length > 0) {
      res.status(200).json({ success: true, searchedUsers: result });
    } else {
      result
        .status(404)
        .json({ success: false, message: "No user found with this name." });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { searchFollowersFollowing };
