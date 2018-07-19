import React from 'react';
import resolver from '../Resolver';
import './Resident.scss';

export default resolver(({data, isLoading, onClick}) => (
  <div
    className="resident"
    onClick={() => {
      onClick(data);
    }}
  >
    {isLoading ? 'Loading...' : data.name}
  </div>
));
