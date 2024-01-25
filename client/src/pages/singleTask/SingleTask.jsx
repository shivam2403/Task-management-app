import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './singleTask.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

const categories=['Grocery', 'Transport', 'Food', 'Clothes', 'Medicine', 'Sports', 'Technical'];
const stat=['Todo','Ongoing','Completed'];


const SingleTask = () => {
  const [task,setTask]=useState();
  const {id}=useParams();
  const [open,setOpen]=useState(false);
  const [openDelete,setOpenDelete]=useState(false);
  const [title,setTitle]=useState(0);
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const [due,setDue]=useState('');
  const [status,setStatus]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchTask=async(req,res)=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/task/${id}`);
        setTask(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTask();
  },[open])

  const handleUpdate=async(e)=>{
    e.preventDefault();

    try {
      console.log(id);
      const res=await axios.put(`http://localhost:5000/api/v1/task/${id}`,{
        title:title,
        category:category,
        description:description,
        due:due,
        status:status,
      })
      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete=async()=>{

    try {
      await axios.delete(`http://localhost:5000/api/v1/task/${id}`);
      setOpenDelete(false);
      navigate('/tasks');    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='se'>
      <Navbar/>
      {open && (
        <div className="se_form_wrap2 flex flexCol">
          <h2 style={{color:"#db0000"}}>UPDATE YOUR TASK</h2>
          <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='se_form2'>
          <input className='se_input2' type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
          <select className='se_input2' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Change Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          <input className='se_input2' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <input className='se_input2' type="text" placeholder='Due date' onChange={(e)=>setDue(e.target.value)}/>
          <select className='e_input' value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="" disabled>Select Status</option>
              {stat.map((st, index) => (
                <option key={index} value={st}>{st}</option>
              ))}
          </select>
          <button className='se_btn2' onClick={handleUpdate}>UPDATE</button>
        </form>
        </div>
      )}

{openDelete && (
        <div className="se_form_wrap3 flex flexCol">
          <span className='se_form_wrap3_span'>Do you want to <span style={{color:"#db0000"}}>delete</span> this Task?</span>
          <div className='se_btns'>
            <button className='se_btn' onClick={handleDelete}>Yes</button>
            <button className='se_btn' onClick={(e)=>setOpenDelete(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className='se_top flex aic jcsb'>
        <h2 style={{alignSelf:"flex-start", marginLeft:"50px",marginTop:"20px",color:"#db0000"}}>Task Id: <span style={{color:"white"}}>{task?._id}</span></h2>
        <div className="se_icons">
          <BiEdit onClick={(e)=>setOpen(true)} className='se_icon'/>
          <AiFillDelete onClick={(e)=>setOpenDelete(true)} className='se_icon'/>
        </div>
      </div>
      <div className="se_wrap">
        <div style={{backgroundColor:"black"}} className="se_form_wrap">
          <h1 style={{marginLeft:"20vw",color:"#db0000"}}>Details</h1>
          <form className='se_form'>
            <ul className='se_ul flex flexCol'>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Title:</h2>
                <h2 style={{color:"white"}}>{task?.title}</h2>
              </li>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Category:</h2>
                <h2 style={{color:"white"}}>{task?.category}</h2>
              </li>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Description:</h2>
                <h2 style={{color:"white"}}>{task?.description}</h2>
              </li>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Status:</h2>
                <h2 style={{color:"white"}}>{task?.status}</h2>
              </li>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Due Date:</h2>
                <h2 style={{color:"white"}}>{new Date(task?.due).toLocaleDateString()}</h2>
              </li>
              <li className='se_li flex'>
                <h2 style={{color:"#db0000"}}>Date created:</h2>
                <h2 style={{color:"white"}}>{new Date(task?.date).toLocaleDateString()}</h2>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SingleTask;