import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/CopyAll';

function Preview(props){
  const [rows, setRows] = useState(1); 
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);
  const writingEffectRef = useRef(null);

  const icon_style = {
    width: '1rem', 
    height: '1rem', 
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
        {props.label}
      </label>
      <textarea
        value={value}
        rows={rows}
        ref={textAreaRef}
        style={{
          width: '40vw',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#333',
          color: '#fff',
          resize: 'none',
        }}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CopyIcon style={icon_style} onClick={handleCopyClick}/>
      </div>

    </div>
  );
};

export default Preview;