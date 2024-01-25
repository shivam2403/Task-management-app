import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const {user,login}=useUser();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();


  const handleRegister=async(e)=>{
    e.preventDefault();

    try {
      const res=await axios.post('https://taskmanagement-backend-11sa.onrender.com/api/v1/auth/register',{
        name,
        email,
        password,
      })

      console.log(res.data);
      navigate('/login');      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='register'>
      <h1 style={{color:"#db0000",fontSize:"50px"}}>Sign Up</h1>
      <div className="r_wrap">
        <div className="r_right">
          <form className='r_form'>
            <input className='r_input' type="name" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
            <input className='r_input' type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input className='r_input' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className='r_btn' onClick={handleRegister}>Sign Up</button>
            <span>Or</span>
            <Link to={'/login'} className='r_sgn'>
              Login
            </Link>
          </form>
      </div>
    </div>
    </div>
  )
}

export default Register