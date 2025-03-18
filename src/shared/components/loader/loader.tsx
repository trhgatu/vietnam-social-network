import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <div className="cssload-container">
      <ul className="cssload-flex-container">
        <li>
          <span className="cssload-loading cssload-one" />
          <span className="cssload-loading cssload-two" />
          <span className="cssload-loading-center" />
        </li>
      </ul>
    </div>
  );
}

export default Loader;