import React from 'react';

const ErrorsList = (props) => {
  return (
    <ul className="error-list">
        {props.errors.map(error => {
          return <li key={error} className="error-item">{error}</li>
        })
      }
    </ul>
  );
};

export default ErrorsList;