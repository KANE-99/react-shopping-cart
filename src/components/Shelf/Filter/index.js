import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateFilters } from '../../../services/filters/actions';
import Checkbox from '../../Checkbox';
import GithubStarButton from '../../github/StarButton';

import './style.scss';

const availableStyles = ['NANO MATE', 'NANO GLASS'];

class Filter extends Component {
  static propTypes = {
    updateFilters: PropTypes.func.isRequired,
    filters: PropTypes.array
  };

  componentDidMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  };

  createCheckbox = label => (
    <Checkbox
      classes="filters-available-size"
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => availableStyles.map(this.createCheckbox);

  render() {
    return (
      <div className="filters">
        <h4 className="title">Types:</h4>
        {this.createCheckboxes()}
        {/* <GithubStarButton /> */}
      </div>
    );
  }
}

export default connect(
  null,
  { updateFilters }
)(Filter);
