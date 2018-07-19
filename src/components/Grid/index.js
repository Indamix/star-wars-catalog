import React, {PureComponent} from 'react';
import {identity} from '../../util/fp';
import {classNames} from '../../util';
import Table from '../Table';
import './Grid.scss';

export default class extends PureComponent {
  state = {
    columnIndex: 0
  };

  componentDidUpdate() {
    this.sort(this.state.columnIndex, this.state.reversed);
  }

  handleSort = index => {
    const {columnIndex, reversed} = this.state;
    this.sort(index, index === columnIndex ? !reversed : false);
  };

  sort(columnIndex, reversed) {
    const {columns, items} = this.props;
    const {sorter, key} = columns[columnIndex];

    this.setState({
      columnIndex,
      reversed,
      items: (reversed ? reverse : identity)(items.sort(sorter(key)))
    });
  }

  render() {
    const {columns, className, rowClassName, onSelect} = this.props;
    const {columnIndex, reversed, items} = this.state;

    return (
      <Table
        className={classNames('grid', className)}
        columns={columns}
        items={items}
        sortedColumn={columnIndex}
        sortReversed={reversed}
        rowClassName={rowClassName}
        onSelect={onSelect}
        onSort={this.handleSort}
      />
    );
  }
}

const reverse = array => array.reverse();
