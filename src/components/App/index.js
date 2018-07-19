import React, {Component} from 'react';
import {getPeople} from '../../services/api';
import Grid from '../Grid';
import Person from '../Person';
import Planet from '../Planet';
import COLUMNS from './columns';
import './App.scss';

const DEFAULT_STATE = {
  people: [],
  selected: {}
};

export default class extends Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    getPeople(people => {
      this.setState({people});
    });
  }

  handleSelect = selected => {
    this.setState({selected});
  };

  render() {
    const {people, selected} = this.state;

    return (
      <div className={selected.name ? 'secondaryView' : ''}>
        <Grid
          className="main"
          columns={COLUMNS}
          items={people}
          rowClassName={({name}) => (selected.name === name ? 'selected' : '')}
          onSelect={this.handleSelect}
        />
        <Person close={() => this.setState({selected: {}})} {...selected} />
        <Planet url={selected.homeworld} onSelect={this.handleSelect} />
      </div>
    );
  }
}
