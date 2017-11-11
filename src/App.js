import React, { Component } from 'react';
import './App.css';
import TimerComponent from './TimerComponent.jsx';

class App extends Component {
  render() {
    const endTimerHandler = (timerValue) => {
      console.log(timerValue);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Commute Time</h1>
        </header>
        <TimerComponent
          endTimerHandler={endTimerHandler}
          className="timer"
        />
      </div>
    );
  }
}

export default App;
