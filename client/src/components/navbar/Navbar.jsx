import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useUser } from '../../context/UserContext'
import axios from 'axios';
import { useState } from 'react';


const Navbar = () => {
  const {user,logout}=useUser();
  console.log(user);
  const navigate=useNavigate();

  const handleLogout=async()=>{
    try {
      await axios.post("http://localhost:5000/api/v1/auth/logout");

      logout(user);

      navigate('/login');
    } catch (error) {
      console.log("Logout failed", error);
    }
  }

  return (
    <div className='navbar'>
      <div className="n_wrap flex jcsb aic">
        <div className="n_left flex aic">
        <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
          <img className='n_logo' src="https://st2.depositphotos.com/3867453/9096/v/450/depositphotos_90960508-stock-illustration-letter-t-logo-icon-design.jpg" alt="Logo" />
        </Link>

          <ul className={`n_ul`}>
            <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
              <li className='n_li'>Home</li>
            </Link>
            <Link to={'/tasks'} style={{textDecoration:"none",color:"inherit"}}>
              <li className='n_li'>My-Tasks</li>
            </Link>
          </ul>
        </div>
        {!user ? (<div className="n_right flex aic">
          <Link to={'/login'}>
            <button className='n_btn'>Login</button>
          </Link>
          <Link to={'/register'}>
            <button className='n_btn'>SignUp</button>
          </Link>
        </div>) : (<div className="n_right flex aic">
          <button className='n_btn' onClick={handleLogout}>Logout</button>
        </div>)}
        
      </div>
    </div>
  )
}

export default Navbar