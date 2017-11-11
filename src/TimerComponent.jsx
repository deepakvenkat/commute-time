import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, ControlLabel } from 'react-bootstrap'
import moment from 'moment';
import './TimerComponent.css';

class TimerComponent extends Component {
  static propTypes = {
    endTimerHandler: PropTypes.func,
  };

  static defaultProps = {
    endTimerHandler: (() => {}),
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
      timerOn: false,
      displayTime: '',
      timerInterval: ''
    };
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

      const displayTime = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
      this.setState({
        displayTime
      });
    }
  }

  render() {
    const {
      props: {
        endTimerHandler,
        className,
      },
    } = this;

    const stopTimer = (e) => {
      clearInterval(this.state.timerInterval);
      const duration = moment.duration(
        (Date.now() - this.state.startTime)
      );
      endTimerHandler({
        duration,
        startTime: this.state.startTime,
        endTime: Date.now(),
      });
    };

    return (
      <div
        className={classnames("timer-wrapper", className)}
      >
        <div
          className="timer-button-wrapper"
        >
          <Button
            bsSize="large"
            block
            bsStyle="success"
            onClick={this.handleStart}
            className="timer-button">
              Start
          </Button>
        </div>
        <div
          className="timer-button-wrapper"
        >
          <Button
            bsSize="large"
            block
            bsStyle="danger"
            onClick={stopTimer}
            className="timer-button">
              Stop
          </Button>
        </div>
        <ControlLabel
          className="timer-duration"
        >
          {this.state.displayTime}
        </ControlLabel>
      </div>
    );
  }
}

export default TimerComponent;
