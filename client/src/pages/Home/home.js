import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "./home.css";

export default function Home() {
	return (
		<div id="homepage">
			<h1>MandemzMad</h1>
			<div id="homeContent">
				<NavLink to="/joinRoom">
					<Button animated>
						<Button.Content visible>Join Room</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
				</NavLink>

				<NavLink to="/createRoom">
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
