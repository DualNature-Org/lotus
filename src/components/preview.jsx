import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/CopyAll';

function Preview(props){
  const [rows, setRows] = useState(1); 
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);
  const writingEffectRef = useRef(null);

  const icon_style = {
    width: '1.2rem', 
    height: '1.2rem', 
    marginRight: '.5rem',
    marginBottom: '.5rem',
    marginTop: '.5rem',
    color:"white",
    cursor: "pointer"
  }

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textAreaRef.current;
      if (textarea) {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
      }
    };

    adjustHeight();
  }, [value]);

  useEffect(() => {
    const startWritingEffect = () => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < props.value.length) {
          setValue(props.value.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 10); 

      writingEffectRef.current = intervalId;
    };

    if (props.writingEffect && props.value) {
      startWritingEffect();
    } else {
      clearInterval(writingEffectRef.current);
    }

    return () => {
      clearInterval(writingEffectRef.current);
    };
  }, [props.writingEffect, props.value]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(props.value);
  };

  const handleDeleteClick = () => {
    props.handleDeletePreview(props.index);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          fontSize: '0.7rem',
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'left',
          // marginBottom: '0.5rem',
          display: 'block',
          margin: '.5rem',
        }}
      >
        {props.label}
      </label>
      <textarea
        value={value}
        rows={rows}
        ref={textAreaRef}
        style={{
          width: '38vw',
          border: 'none',
          outline: 'none',
          padding: '1rem',
          fontSize: '1rem',
          backgroundColor: '#333',
          color: '#fff',
          resize: 'none',
          borderRadius: '8px',
          opacity: '0.8',
        }}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '.3rem' }}>
        <CopyIcon style={icon_style} onClick={handleCopyClick}/>
        <DeleteIcon style={icon_style} onClick={handleDeleteClick} />
      </div>
    </div>
  );
};

export default Preview;