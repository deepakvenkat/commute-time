import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      endTime: 0,
      duration: 0,
      timerOn: false,
      displayTime: '',
      timerInterval: ''
    }
  }
  handleStart = (e) => {
    this.setState(() => {
      const interval = setInterval(this.updateDuration, 300);
      return {
        timerInterval: interval,
        timerOn: true,
        startTime: Date.now(),
      };
    });
  }

  updateDuration = () => {
    if (this.state.timerOn) {
      const currentTime = Date.now();
      const duration = moment.duration(
        (currentTime - this.state.startTime)
      );
      console.log(duration)
      const displayTime = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
      this.setState({
        displayTime
      });
    }
  }

  stopTime = () => {
    clearInterval(this.state.timerInterval);
  }
  componentDidUpdate = () => {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Commute Time</h1>
        </header>
        <Button
          bsSize="large"
          block
          bsStyle="success"
          onClick={this.handleStart}>
            Start
        </Button>
        <Button
          bsSize="large"
          block
          bsStyle="danger"
          onClick={this.stopTime}>
            Stop
        </Button>
        <div> {this.state.displayTime}</div>
      </div>
    );
  }
}

export default App;
