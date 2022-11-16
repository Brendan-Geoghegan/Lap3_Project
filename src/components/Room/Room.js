import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import { QuizContext } from "../../context/quizContext";
import { Dimmer, Loader } from "semantic-ui-react";

const Room = () => {
  const navigate = useNavigate();

  const {
    socket,
    toggle,
    setCategory,
    setDifficulty,
    category,
    difficulty,
    userData,
    setUserData,
  } = useContext(QuizContext);

  const createRoom = (e) => {
    e.preventDefault();
    // Sends message to Backend
    if (userData.username !== "") {
      socket.emit("create_room", {
        username: userData.username,
        category,
        difficulty,
      });
      navigate("/waitingRoom");
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();
    // Sends message to Backend
    if (userData.username !== "" && userData.room) {
      socket.emit("join_room", {
        username: userData.username,
        room: userData.room,
      });
      navigate("/waitingRoom");
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {toggle === "create" ? (
        <>
          <h1>Create Room</h1>
          <div className="main-container create-room">
            <form onSubmit={createRoom}>
              <input
                type="text"
                placeholder="Enter Username..."
                onChange={(e) => {
                  setUserData((prev) => {
                    return { ...prev, username: e.target.value };
                  });
                }}
                required
              />
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={9}>General Knowledge</option>
                <option value={11}>Movies</option>
                <option value={14}>TV</option>
                <option value={27}>Animals</option>
                <option value={15}>Video Games</option>
                <option value={29}>Comics</option>
                <option value={31}>Anime</option>
              </select>
              <select
                name="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <input type="submit" value="Create Room" />
            </form>
            <div style={{ display: loading ? "block" : "none" }}>
              <Dimmer active>
                <Loader>Redirecting to Create Room</Loader>
              </Dimmer>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Join Room</h1>
          <div className="main-container create-room">
            <form onSubmit={joinRoom}>
              <input
                type="text"
                placeholder="Enter Room..."
                onChange={(e) => {
                  setUserData((prev) => {
                    return { ...prev, room: e.target.value };
                  });
                }}
                required
              />
              <input
                type="text"
                placeholder="Enter Username..."
                onChange={(e) => {
                  setUserData((prev) => {
                    return { ...prev, username: e.target.value };
                  });
                }}
                required
              />
              <input type="submit" value="Join Room" />
            </form>
            <div style={{ display: loading ? "block" : "none" }}>
              <Dimmer active>
                <Loader>Redirecting to Join Room</Loader>
              </Dimmer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Room;
