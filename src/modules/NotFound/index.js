import React from 'react';
import './style.less';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div>404 Not Found</div>
      <button className="button" onClick={() => history.replace('/')} type="button">Home Page</button>
    </div>
  );
};

export default NotFound;
