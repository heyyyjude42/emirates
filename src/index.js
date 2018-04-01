import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import choices from './data.json';
import "./fonts.css";

function header() {
  return <h3 class="head"> </h3>;
}

function label(text, variable) {
  return <div class="label">{text}: {variable}</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.choicesLeft = choices.slice();
    const choice = this.getNewChoice();
    this.state = {
      highscore: 0,
      score : 0,
      choice: choice,
      gameOver: false,
      label: "Does Emirates fly here?",
    };
  }

  getNewChoice() {
    if (this.choicesLeft.length === 0) {
      this.choicesLeft = choices.slice();
    }

    var index = Math.floor(Math.random() * this.choicesLeft.length);
    var toReturn = this.choicesLeft[index];

    this.choicesLeft.splice(index, 1);
    return toReturn;
  }

  yesClicked() {
    this.choiceClicked(true);
  }

  noClicked() {
    this.choiceClicked(false);
  }

  choiceClicked(isYes) {
    if (isYes && this.state.choice.flies === 1 || !isYes && this.state.choice.flies === 0) {
      const newScore = this.state.score + 1;
      const newHigh = Math.max(newScore, this.state.highscore);
      const newChoice = this.getNewChoice();
      this.setState({
        highscore: newHigh,
        score: newScore,
        choice: newChoice,
      });
    } else {
      this.setState({
        gameOver: true,
        label: "Game Over :(",
      });
    }
  }

  restart() {
    this.choicesLeft = choices.slice();
    const newChoice = this.getNewChoice();
    this.setState({
      score : 0,
      choice: newChoice,
      gameOver: false,
      label: "Does Emirates fly here?",
    });
  }

  render() {
    const toDisplay = this.state.choice["place"];

    return (
      <div>
        {header()}
        <div style={{"marginBottom": this.state.gameOver ? '30px' : '0px'}}>{this.state.label}</div>
        <div class="location" style={{display: this.state.gameOver ? 'none' : 'block' }}>{toDisplay}</div>
        <div style={{display: this.state.gameOver ? 'none' : 'flex'}} class="choicesPanel">
          <button class="option" onClick={() => this.yesClicked()}>Yes</button>
          <button class="option" onClick={() => this.noClicked()}>No</button>
        </div>
        {label("Score", this.state.score)}
        {label("High Score", this.state.highscore)}
        <div style={{display: this.state.gameOver ? 'block' : 'none' }}>
          <button class="restart" onClick={() => this.restart()}>Restart</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
