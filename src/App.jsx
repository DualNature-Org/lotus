import { useState } from 'react'
import './App.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Drawer, Button } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import CircularWithValueLabel from './components/progress'
import Conversation from './components/conversation';

function App() {
  const [drawer, setdrawer] = useState(false)
  const handle_menu = () => {
    setdrawer(!drawer)
  }
  return (
    <>
    <div className='statusbar'>
      <div className='left'>

        <AddCircleOutlineIcon className='icons'/>
        <FormatListBulletedIcon className='icons' onClick = {handle_menu}/>

        <h2>LOTUS</h2>
        <Drawer open={drawer} onClose={handle_menu}>
          {'ORE PIYA'}
        </Drawer>
      </div>
      <div className='right'>
        </div>
    </div>
    <div className="main">
      <div className="converstions">
        <Conversation/>
      </div>
      <div className="preview">

      </div>
    </div>
    </>
  )
}

export default App
