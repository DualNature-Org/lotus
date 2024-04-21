import React from 'react';
import Copy from '../assets/copy.svg';
import regenerate from '../assets/refresh.svg';
const TextArea = ({ label, value, }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          fontSize: '0.5rem',
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'left',
          marginBottom: '0.5rem',
          display: 'block',
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        style={{
          width: '40vw',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#333',
          // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          color: '#fff',
          resize: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={Copy} style={{ width: '1rem', height: '1rem', marginTop: '2px', marginLeft: '1px' ,color:"white"}} />
        <img src={regenerate} style={{ width: '1rem', height: '1rem', marginTop: '2px', marginLeft: '4px',color:"white" }} />
      </div>

    </div>
  );
};

export default TextArea;