import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormControl, ControlLabel, InputGroup, Glyphicon} from 'react-bootstrap';

import './TrainCountComponent.css';

class TrainCountComponent extends Component {
  static propTypes = {
    trainCountChangeHandler: PropTypes.func,
    trainCount: PropTypes.number,
  };

  static defaultPropTypes = {
    trainCountChangeHandler: (() => {}),
    trainCount: 0,
  };

  render() {
    const {
      trainCountChangeHandler,
      trainCount,
    } = this.props;

    return(
      <div className="train-count-wrapper">
      <ControlLabel> Number of Trains</ControlLabel>
        <InputGroup
          className="train-count-group"
        >
          <InputGroup.Addon
            onClick={() => trainCountChangeHandler(false)}
          >
            <Glyphicon glyph='minus-sign'/>
          </InputGroup.Addon>
          <FormControl
            className="train-count-input"
            type="text"
            value={trainCount}
            readOnly
          />
          <InputGroup.Addon
            onClick = {() => trainCountChangeHandler(true)}
          >
            <Glyphicon glyph='plus-sign'/>
          </InputGroup.Addon>
        </InputGroup>
      </div>
    );
  }
}

export default TrainCountComponent;
