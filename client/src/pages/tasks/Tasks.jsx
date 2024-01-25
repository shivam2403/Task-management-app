import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './tasks.css'
import axios from 'axios';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {AiFillFileAdd} from 'react-icons/ai'

const categories=['Grocery', 'Transport', 'Food', 'Clothes', 'Medicine', 'Sports', 'Technical'];
const stat=['Todo','Ongoing','Completed'];

const Tasks = () => {
  const {user}=useUser();
  const [tasks,setTasks]=useState([]);
  var total=0;
  const [open,setOpen]=useState(false);

  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const [due,setDue]=useState('');
  const [status,setStatus]=useState('');
  const navigate=useNavigate();

  console.log(open)
  useEffect(()=>{
    const fetchTask=async()=>{
      try {
        const res=await axios.get(`https://taskmanagement-backend-11sa.onrender.com/api/v1/task/by-user/${user._id}`);
        setTasks(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchTask();
  },[])

  const handleAdd=async(e)=>{
    e.preventDefault();

    try {
      const res=await axios.post('https://taskmanagement-backend-11sa.onrender.com/api/v1/task',{
        title:title,
        category:category,
        description:description,
        due:due,
        status:status,
        user:user._id,
      })

      const resp = await axios.get(`https://taskmanagement-backend-11sa.onrender.com/api/v1/task/by-user/${user._id}`);
      setTasks(resp.data);

      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='task'>
      <Navbar/>
      {open && (
        <div className="e_form_wrap">

        <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='e_form'>
          <input className='e_input' type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
          <select className='e_input' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
          </select>
          <input className='e_input' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <input className='e_input' type="text" placeholder='Due date' onChange={(e)=>setDue(e.target.value)}/>
          <select className='e_input' value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="" disabled>Select Status</option>
              {stat.map((st, index) => (
                <option key={index} value={st}>{st}</option>
              ))}
          </select>
          <button className='e_btn' onClick={handleAdd}>Add</button>
        </form>
        </div>
      )}
      <div className="e_wrap">
        <div className="e_top flex aic">
          <h1 style={{color:"#db0000"}}>My Tasks</h1>
          <button className='e_top_btn' onClick={(e)=>setOpen(true)}>
            <span >Add Task</span>
            <AiFillFileAdd/>
          </button>
        </div>
        <ul className='e_ul_sp'>
          <li className='e_li'>Date</li>
          <li className='e_li'>Amount</li>
          <li className='e_li'>Category</li>
          <li className='e_li'>Description</li>
          <li className='e_li'>Status</li>
          <li className='e_li'>Due Date</li>
        </ul>
        {tasks.length>0 ? (tasks.map((e,i)=>(
          <Link to={`/task/${e._id}`} style={{textDecoration:"none", color:"inherit"}}>
          <ul className='e_ul'>
            <li className='e_li'>{new Date(e.date).toLocaleDateString()}</li>
            <li className='e_li'>{e.title}</li>
            <li className='e_li'>{e.category}</li>
            <li className='e_li'>{e.description?.substring(0,16)+"..."}</li>
            <li className='e_li'>{e.status}</li>
            <li className='e_li'>{new Date(e.due).toLocaleDateString()}</li>
          </ul>
          </Link>
        ))):
        (
          <div style={{width:"100%",height:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"#db0000"}}>
            <h1>Hurray! no tasks to do currently</h1>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Tasks