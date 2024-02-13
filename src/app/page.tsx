"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.module.css";
import Nav from "@/component/Navbar";
import { taskDef } from "@/component/types";
import { saveTasksToLocal, getTaskFromLocal } from "@/component";
import axios from "axios";
import Spinner from "@/component/Spinner";



export default function Home() {
  const [tasks, setTasks] = useState<taskDef[]>([])
  const [loading, setLoading] = useState(false);

  const deleteTask = (i:number)=>{
  // if(tasks[i].scheduled) return alert("You cannot delete this task");
  // let tasks2 = Object.assign([], tasks);
  // tasks2.splice(i,1);
  // setTasks(tasks2);
  // saveTasksToLocal(tasks2);
  }

  const scheduledTask = (i: number) => {
    // let tasks2: taskDef[] = Object.assign([], tasks);
    // tasks2[i].scheduled = !tasks2[i].scheduled;
    // setTasks(tasks2);
    // saveTasksToLocal(tasks2);
  };

  useEffect(()=>{
   (async () => {
      setLoading(true)
      const res = await axios.get(
        "https://crudcrud.com/api/8864861aca83475a82865ac299a7c9a1/task"
      );
      setTasks(res.data);
      setLoading(false)
      // console.log(res.data)
    })();
  },[])

  return (
    <main>
      <Nav title="TODO List" rightIcon="calender" />
      {loading && <Spinner/>}
      { !loading && <div className="todo-center-container" >
        <div className="todo-list-container" id="todo-list"></div>
        {tasks.map((task)=>(<div className="todo-bar" key={task.title}>
             <div className="todo-bar-left-section">
               <div className="title">{task.title}</div>
               <div className="sub-title">{task.detail}</div>
             </div>
             <div className="todo-bar-right-section">
                <Link href={`/EditTask/${task._id}`} ><img src="./icons/pen.svg" /></Link>
               <img src="./icons/delet.svg" onClick={()=>deleteTask(task._id)}  />
               <img src="./icons/checkcircle.svg"   onClick={()=>scheduledTask(task._id)} className={task.scheduled ? "scheduled" : ""}/>
             </div>
           </div>))}
           </div>}
           <div>
        <div className="add-todo-button">
          {/* <Link href="/AddTask" className="button">+</Link> */}
          <Link href="/AddTask" className="button"><img src="/icons/plusicon.svg"/></Link>
        </div>
      </div>
      
      <div className="footer-container">
        <div className="left-footer">
          <div><img src="./icons/all.svg" /></div>
          <div className="footer-text">All</div>
        </div>
        <div className="right-footer">
          <div><img src="./icons/vector.svg" /></div>
          <div className="footer-text">Completed</div>
        </div>
      </div>
    </main>
  );
}
