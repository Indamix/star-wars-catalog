import React from 'react';
import {classNames} from '../../util';
import {identity} from '../../util/fp';
import './Table.scss';

export default ({
  items = [],
  className = '',
  columns,
  sortedColumn,
  sortReversed,
  rowClassName,
  onSelect,
  onSort
}) => {
  const th = ({name, key, sorter}, index) => (
    <th
      key={key}
      className={classNames(
        key,
        sorter && 'sortable',
        index === sortedColumn && 'sorted',
        index === sortedColumn && sortReversed && 'reversed'
      )}
      onClick={sorter && (() => onSort(index))}
    >
      {name}
    </th>
  );

  const tr = (item, i) => {
    const td = ({format = identity, key}) => (
      <td
        key={key}
        className={key}
        onClick={onSelect && (() => onSelect(item))}
      >
        {format(item[key])}
      </td>
    );

    return (
      <tr key={i} className={rowClassName && rowClassName(item)}>
        {columns.map(td)}
      </tr>
    );
  };

  return (
    <table className={classNames('table', className)}>
      <thead>
        <tr className="head">{columns.map(th)}</tr>
      </thead>
      <tbody>{items.map(tr)}</tbody>
    </table>
  );
};
