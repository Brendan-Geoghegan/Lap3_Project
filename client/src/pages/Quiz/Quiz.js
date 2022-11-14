import React from "react";
import { Button, Header, Segment, Divider, Grid } from "semantic-ui-react";
import "./quiz.css"

const Quiz = () => {
  return (
    <div id="quizpage">
      <div id="currentScore">Score</div>

      <div id="questionSection">
        <Header as="h2" attached="top">
          Question 1
        </Header>
        <Segment attached>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Segment>
      </div>

      <div id="answerSection">
        <Grid id='answerGrid' columns={2} relaxed="very">
          <Grid.Column>
            <p>
              <Button>Answer1</Button>
            </p>
            <p>
              <Button>Answer2</Button>
            </p>
          </Grid.Column>
          <Grid.Column>
            <p>
              <Button>Answer3</Button>
            </p>
            <p>
              <Button>Answer4</Button>
            </p>
          </Grid.Column>
        </Grid>

      </div>
    </div>
  );
};

export default Quiz;
