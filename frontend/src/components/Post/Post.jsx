import React,{useState} from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likePost } from "../../api/PostsRequests";
import { BiComment } from "react-icons/bi";
import { TbBrandTelegram } from "react-icons/tb";
import { useSelector } from "react-redux";
const Post = ({data}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

    const handleLike = () => {
      likePost(data._id, user._id);
      setLiked((prev) => !prev);
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt="post"
      />
      <div className="postReact" onClick={handleLike}>
        {liked ? <AiFillHeart size={26} /> : <AiOutlineHeart size={26} />}
        <BiComment size={26} />
        <TbBrandTelegram size={26} />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "14px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
