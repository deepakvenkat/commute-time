import React, { Component } from 'react';
import './App.css';
import TimerComponent from './TimerComponent.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: true,
      showRecordForm: false,
    };
  }
  render() {
    const endTimerHandler = (timerValue) => {
      console.log(timerValue);
      this.setState({
        showTimer: false,
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Commute Time</h1>
        </header>
        <TimerComponent
          endTimerHandler={endTimerHandler}
          className="timer"
          show={this.state.showTimer}
        />
      </div>
    );
  }
}

export default App;
