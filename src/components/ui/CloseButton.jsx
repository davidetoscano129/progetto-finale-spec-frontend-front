import React from 'react';
import '../../styles/CloseButton.css';

const CloseButton = ({ onClick, className = "", style = {} }) => {
  return (
    <button
      className={`close-button ${className}`}
      style={style}
      aria-label="Close"
      onClick={onClick}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export default CloseButton;