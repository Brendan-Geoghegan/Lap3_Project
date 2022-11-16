import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "./home.css";

import { QuizContext } from "../../context/quizContext";

export default function Home() {
  const { setToggle } = useContext(QuizContext);

  return (
    <div id="homepage">
      <h1 id="homepageh1">
        <span>M</span>
        <span>a</span>
        <span>n</span>
        <span>d</span>
        <span>e</span>
        <span>m</span>
        <span>Z</span>
		<span>m</span>
		<span>a</span>
		<span>d</span>
      </h1>
      <div id="homeContent">
        <NavLink to="/room" onClick={() => setToggle("join")}>
          <Button animated>
            <Button.Content visible>Join Room</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </NavLink>

        <NavLink to="/room" onClick={() => setToggle("create")}>
          <Button animated="fade">
            <Button.Content visible>Create Room</Button.Content>
            <Button.Content hidden>Let's get started!</Button.Content>
          </Button>
        </NavLink>

        <NavLink to="/leaderboard">
          <Button animated="vertical">
            <Button.Content hidden>
              <Icon name="trophy" />
            </Button.Content>
            <Button.Content visible>Leaderboard</Button.Content>
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
