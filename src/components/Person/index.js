import React from 'react';
import CloseIcon from '../icons/Close';
import Table from '../Table';
import PROPERTIES from './properties';
import './Person.scss';

export default props => {
  const toItem = ({key, name}) => ({
    key: name,
    value: props[key]
  });

  return (
    <div className="person">
      <CloseIcon onClick={props.close} />
      <Table
        columns={createColumns(props.name)}
        items={PROPERTIES.map(toItem)}
      />
    </div>
  );
};

const createColumns = name => [
  {
    key: 'key',
    name
  },
  {
    key: 'value',
    name: ''
  }
];
