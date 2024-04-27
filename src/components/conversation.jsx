import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './conversation.css';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextArea from './textarea';

function Conversation() {
  const [userInput, setUserInput] = useState('');
  const [query, setQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState("Enter Claude's response...");
  const [status, setStatus] = useState('1');
  const [conversations, setConversations] = useState([]);
  const [previewConversations, setPreviewConversations] = useState([
  ]);

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const updateQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleQuery = () => {
    const url = 'https://dualnature.xyz/lotus/response/';

    const data = {
      query: query,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPreviewConversations([
          ...previewConversations,
          data['output'],
        ]);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };

  const handleAddMessage = (text) => {
    setConversations([
      ...conversations,
      { index: 1 + conversations[conversations.length - 1], text: text },
    ]);
    setUserInput('');
    setAssistantResponse("Enter Lotus's response...");
  };

  const handleAddToConversation = () => {
    setConversations([...conversations, ...previewConversations.map((text, index) => ({
      index: conversations.length + index + 1,
      text: text,
    }))]);
    setPreviewConversations([]); // Clear preview after adding to main conversation
  };

  return (
    <>

      <div className='conversation-container'>
        <div style={{ width: "3%", height: "100vh", backgroundColor: "grey" }}>

        </div>
        <Box className='b0' sx={{ width: '50%', marginTop: '1rem', }}>
          <Box sx={{ flex: '1', textAlign: 'left' }}>
            <TextArea label='LOTUS' value={"Hi, I'm LOTUS."} className="j" />
            {conversations.map((conv, index) => (
              <TextArea label='LOTUS' key={index} mt={2} value={conv.text} />
            ))}
            <Box className='querywrapper'>
              <Tooltip placement='left' title='Add Messages'>
                <IconButton>
                  <PlaylistAddIcon style={{color: 'white'}} onClick={() => handleAddMessage(query)} />
                </IconButton>
              </Tooltip>
              <TextField
                className='query'
                label='Query'  
                id='outlined-size-small'
                color='info'
                style={{ backgroundColor: 'white'}}
                defaultValue='/'
                size='small'
                sx={{ width: '40vw' }}
                onChange={updateQuery}
              />
              <Button variant='text' endIcon={<SendIcon />} value={query} onClick={handleQuery}>
                Send
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className='b1' sx={{ width: '40%', height: "100vh", overflow: 'hidden', backgroundColor: "rgba(235, 229, 232, 0.2)", padding: "1rem" }}>
          {
            previewConversations.length === 0 && (
              <h3 style={{ color: "white", fontFamily: 'monospace', backgroundColor: "rgba(235, 229, 232, 0.2)", fontSize: '2rem', padding: '1rem' }}>No Preview</h3>
            )

          }
          {previewConversations.map((preview, index) => (
            <div key={index}>
              <TextArea label='Preview' mt={2} value={preview} />
            </div>
          ))}
          {
            previewConversations.length != 0 && (
              <Button variant='outlined' style={{ backgroundColor: "blue", color: "white" }} onClick={handleAddToConversation}>
                Add All to Conversation
              </Button>
            )
          }
        </Box>
      </div>
    </>

  );
}

export default Conversation;

