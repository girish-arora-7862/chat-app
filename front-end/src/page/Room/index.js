import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import { selectUsername } from "../../redux/reducer/userSlice";
import "./index.css";

const Room = (props) => {
  const { socket } = props;
  const params = useParams();
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [message, setMessage] = useState("");
  const username = useSelector(selectUsername);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      const room = params.roomId;
      setRoomId(room);
      socket.emit("joinRoom", {
        roomId: room,
      });
      socket.on("newMessage", (data) => {
        if (data.username !== username) {
          cogoToast.info("New Message Received...");
        }
        setRoomData((oldRoomData) => {
          return [...oldRoomData, data];
        });
      });
    } else {
      navigate("/");
      cogoToast.error("Please login again...");
    }
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message) {
      socket.emit("message", {
        roomId,
        username: username,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div className="room-wrapper">
      <div className="room-title display-1">{roomId}</div>
      <div className="chats-wrapper">
        {roomData.map((chat,i) => {
          return <Chat key={i} data={chat} />;
        })}
      </div>
      <div className="msg-wrapper">
        <input
          className="form-control field-custom"
          value={message}
          onChange={handleMessageChange}
        />
        <button
          className="btn btn-primary btn-custom-room"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
