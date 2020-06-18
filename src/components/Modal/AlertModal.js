import React from 'react';
import './alertModal.css';

const AlertModal = ({ content }) => {
  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <h2>Here i am</h2>
        <a className="close" href="#">
          &times;
        </a>
        <div className="content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
