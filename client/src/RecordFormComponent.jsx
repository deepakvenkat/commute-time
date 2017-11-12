import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, FormControl, Checkbox, Button } from 'react-bootstrap';

import './RecordFormComponent.css';
import TrainCountComponent from './TrainCountComponent.jsx';
import TrainListComponent from './TrainListComponent.jsx';

class RecordFormComponent extends Component {
  static propTypes = {
    show: PropTypes.bool,
    submitHandler: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultPropTypes = {
    show: true,
    submitHandler: (() => {}),
  };

  constructor(props) {
    super(props);

    this.state = {
      trainCount: 1,
      trainList: [],
      timerValue: '',
    };

    this.changeTrainCount = this.changeTrainCount.bind(this);
    this.updateTrainList = this.updateTrainList.bind(this);
    this.recordCommute = this.recordCommute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { timerValue } = nextProps
    this.setState({
      timerValue,
    })
  }

  changeTrainCount(increase) {
    let { trainCount } = this.state;
    if (trainCount === 1 && !increase) {
      return;
    }
    this.setState({
      trainCount: (increase ? ++trainCount : --trainCount),
    });
  }

  updateTrainList(position, trainName) {
    const { trainList } = this.state;
    trainList[position] = trainName;
    this.setState({ trainList });
  }

  getDisplayTimer(duration) {
    return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
  }

  recordCommute(e) {
    e.preventDefault();
    const { trainList, timerValue } = this.state;
    const { submitHandler } = this.props;
    const commuteData = {
      startingPoint: this.startingPoint.value,
      endingPoint: this.endingPoint.value,
      userName: this.userName.value,
      outlier: this.outlier.checked,
      trainList,
      timerValue,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    fetch('http://localhost:3001/commute', {
      method: 'post',
      headers,
      body: JSON.stringify(commuteData),
    })
    .then((response) => {
      submitHandler();
    });
  }

  render() {
    const { className, show } = this.props;
    const { timerValue } = this.state;

    const displayTimer = timerValue ?
      this.getDisplayTimer(timerValue.duration) : '';

    const wrapperClass = classnames(
      'record-form-wrapper',
      className,
      show ? '' : 'hide',
    );

    return(
      <div
        className={wrapperClass}
      >
        <Form
          className="record-form"
          onSubmit={this.recordCommute}
        >
          <FormControl
            type='text'
            value={displayTimer}
            onChange={() => {}}
            readOnly
            disabled
            className='record-form-timer'
          />
          <FormControl
            type='text'
            placeholder='UserName'
            inputRef={el => this.userName = el}
          />
          <FormControl
            type='text'
            placeholder='Starting Point'
            inputRef={el => this.startingPoint = el}
          />
          <FormControl
            type='text'
            placeholder='EndingPoint'
            inputRef={el => this.endingPoint = el}
          />
          <TrainCountComponent
            trainCountChangeHandler={this.changeTrainCount}
            trainCount={this.state.trainCount}
          />
          <TrainListComponent
            trainCount={this.state.trainCount}
            trainList={this.state.trainList}
            handleInputChange={this.updateTrainList}
          />
          <Checkbox
            inputRef={el => this.outlier = el}
          >
            Outlier? (Delays)
          </Checkbox>
          <Button
            bsStyle="primary"
            bsSize="large"
            type="submit"
            block
          >
            Record
          </Button>
        </Form>
      </div>
    );
  }
}

export default RecordFormComponent;
