import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';



const Home = () => {
  const {user}=useUser();

  return (
    <div className='home'>
      <Navbar/>
      <div className='h_wrap'>
        <div className='h_info'>
          <h1 className='h_intro_title'>Hello, <span style={{color:"#db0000"}}>{user?.name}!</span></h1>
          <p className='h_intro_desc'>This is the <span style={{color:"#db0000"}}>task management</span> app. Here you can create your tasks, update tasks and delete tasks. You can give title, description, Due date, status, category etc to every task and you can also update all these properties.
          To watch your tasks and manage them click "My tasks" button on navbar or below.
          </p>
          <Link to={'/tasks'} style={{textDecoration:"none",color:"inherit"}}>
            <button className='h_btn'>
              My Tasks
            </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Home