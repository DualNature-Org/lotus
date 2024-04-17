import React from 'react';

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
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          backgroundColor: '#333',
          color: '#fff',
          resize: 'none',
        }}
      />
    </div>
  );
};

export default TextArea;