import postData from '../models/postData.js';

const getPosts = async (req, res) => {
  let postDatas = await postData.find();
  res.send(postDatas);
}

export { getPosts };