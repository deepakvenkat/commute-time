import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap';

class TrainListComponent extends Component {
  static propTypes = {
    trainCount: PropTypes.number,
    handleInputChange: PropTypes.func,
  };

  static defaultProps = {
    trainCount: 1,
    handleInputChange: (() => {}),
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(item, e) {
    const { currentTarget: { value }} = e;
    this.props.handleInputChange(item, value);
  }

  createTrainList(count, trainList = []) {
    const trainListInputs = [];
    for (let i = 0; i < count; i++) {
      const index = i;
      const value = trainList[i];
      trainListInputs.push(
        <FormControl
          type="text"
          //eslint-disable-next-line
          onChange={(e) => this.handleChange(index, e)}
          value={value}
        />
      )
    };
    return trainListInputs;
  }

  render() {
    const { trainCount, trainList } = this.props;
    return (
      <div>
        {this.createTrainList(trainCount, trainList)}
      </div>
    );
  }
}

export default TrainListComponent;
