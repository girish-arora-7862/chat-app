import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsername } from "../../redux/reducer/userSlice";
import "./index.css"

const Rooms = (props) => {
  const { socket } = props;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  useEffect(() => {
    if (username) {
      socket.emit("rooms");
      socket.on("roomsResponse", (data) => {
        setRooms(data.rooms);
      });
    } else {
      navigate("/");
    }
  }, []);

  const handleRoomClick = (room) => {
    navigate(`/room/${room}`);
  };
  return (
    <div>
      <div className="room-title display-1">Rooms</div>
      <div className="grid-col">
        {rooms.map((room,i) => {
          return <div key={i} className="card room-card display-4" onClick={() => handleRoomClick(room)}>{room}</div>;
        })}
      </div>
    </div>
  );
};

export default Rooms;
