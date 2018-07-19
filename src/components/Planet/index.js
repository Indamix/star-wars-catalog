import React from 'react';
import resolver from '../Resolver';
import Table from '../Table';
import Resident from '../Resident';
import './Planet.scss';

export default resolver(
  ({data: {name, residents = []}, isLoading, onSelect}) => (
    <div className="planet">
      {isLoading ? (
        'Loading...'
      ) : (
        <Table
          columns={[
            {
              name,
              key: 'url',
              format: url => <Resident url={url} onClick={onSelect} />
            }
          ]}
          items={residents.map(toResident)}
        />
      )}
    </div>
  )
);

const toResident = url => ({url});
