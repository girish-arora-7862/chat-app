import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/reducer/userSlice";
import "./index.css";

const Chat = (props) => {
  const { data } = props;
  const username = useSelector(selectUsername);
  return (
    <div className="chat-wrapper">
      <span className="chat-name">
        {data.username === username ? "Me" : data.username} :{" "}
      </span>
      {data.message}
    </div>
  );
};

export default Chat;
