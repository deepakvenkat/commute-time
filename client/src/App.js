import React, { Component } from 'react';
import './App.css';
import TimerComponent from './TimerComponent.jsx';
import RecordFormComponent from './RecordFormComponent.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: true,
      showRecordForm: false,
      timerValue: {
        startTime: 0,
        endTime: 0,
      },
    };
  }

  render() {
    const endTimerHandler = (timerValue) => {
      this.setState({
        showTimer: false,
        showRecordForm: true,
        timerValue: timerValue
      });
    }

    const handleRecordCommute = () => {
      this.setState({
        showTimer: true,
        showRecordForm: false,
      });
    };

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
        <RecordFormComponent
          show={this.state.showRecordForm}
          timerValue={this.state.timerValue}
          submitHandler={handleRecordCommute}
        />
      </div>
    );
  }
}

export default App;
