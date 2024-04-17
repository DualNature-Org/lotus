import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './conversation.css'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextArea from './textarea';



function Conversation(){
  const [userInput, setUserInput] = useState('');
  const [query, setQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('Enter Claude\'s response...');
  const [status, setStatus] = useState('1')
  const [conversations, setConversations] = useState([]);

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const updateQuery = (event) => {
    setQuery(event.target.value);
  }

  const handleQuery = () => {
    const url = 'http://127.0.0.1:8000/lotus/response/';
  
    const data = {
      query: query 
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log(data); 
        setConversations([
          ...conversations,
          { index: 1 + conversations[conversations.length -1],
            text: data['output']},
        ])
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };
  

  const handleAddMessage = () => {
    setConversations([
      ...conversations,
      { index: 1 + conversations[conversations.length -1],
        text: '/'},
    ]);
    setUserInput('');
    setAssistantResponse('Enter Lotus\'s response...');
  };

  return (
    <Box sx={{marginTop: '1rem'}}>
      <TextArea label='LOTUS' value={"Hi, I'm LOTUS."}/>
      {conversations.map((conv, index) => (
        <TextArea label="LOTUS" key={index} mt = {2} value={conv.text}/>
      ))}
      <Box className='querywrapper'>
      <Tooltip placement='left' title='Add Messages'>
        <IconButton>
          <PlaylistAddIcon onClick={handleAddMessage}/>
        </IconButton>
      </Tooltip>
      <TextField 
          className='query'
          label="Query"
          id="outlined-size-small"
          defaultValue="/"
          size="small"
          sx={{ width: '40vw' }}
          onChange={updateQuery}
        />
        <Button variant="text" endIcon={<SendIcon />} value = {query} onClick={handleQuery}>
          Send
        </Button>
      
      </Box>
    </Box>
  );
};

export default Conversation;