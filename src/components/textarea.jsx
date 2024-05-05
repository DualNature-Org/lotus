import React, { useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/CopyAll';

function TextArea(props){
  const textAreaRef = useRef(null);

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
  }, [props.value]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(props.value);
  };

  const handleDeleteClick = () => {
    props.handleDeleteConversation(props.index);
  };


  return (
    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <CopyIcon style={icon_style} onClick={handleCopyClick}/>
        <DeleteIcon style={icon_style} onClick={handleDeleteClick} />
      </div>
      <textarea
        value={props.value}
        ref={textAreaRef}
        style={{
          width: '45vw',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#333',
          color: '#fff',
          resize: 'none',
        }}
      />

      

    </div>
  );
};

export default TextArea;