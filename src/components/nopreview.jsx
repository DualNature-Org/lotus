import React from 'react';

const NoPreview = () => {
  const divStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #303030, #212121)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '2rem',
  };

  return (
    <div style={divStyle}>
      No Preview
    </div>
  );
};

export default NoPreview;
