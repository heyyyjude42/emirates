import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import choices from './data.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.choicesLeft = choices.slice();
    const choice = this.getNewChoice();
    this.state = {
      highscore: 0,
      score : 0,
      choice: choice,
      gameOver: false,
      label: "Does Emirates fly here?",
    };
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
