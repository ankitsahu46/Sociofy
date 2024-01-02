import userData from "../../models/userData.js";

const getUsers = async (req, res) => {
  const { searched_text } = req.query;

  try {
    const result = await userData.find({
      username: {
        $regex: `${searched_text}`
      }
    }).select({ username: 1, img: 1, name: 1 });

    res.status(200).send({ success: true, result: result});
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't find user"});
  }
}

export { getUsers }