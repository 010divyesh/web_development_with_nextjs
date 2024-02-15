"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.module.css";
import Nav from "@/component/Navbar";
import { taskDef } from "@/component/types";
import axios from "@/component/api";
import Spinner from "@/component/Spinner";



export default function Home() {
  const [tasks, setTasks] = useState<taskDef[]>([]);
  const [loading, setLoading] = useState(false);

  const deleteTask = async (task: taskDef) => {
    setLoading(true);
    if(task.scheduled){
      alert(`This task ${task.title} cannot be deleted`);
      setLoading(false);
      return
    }
    try {
      await axios.delete(`/tasks/${task._uuid}`);
      const res = await axios.get("/tasks");
      setTasks(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const scheduledTask = async (task: taskDef) => {
    setLoading(true);
    let task2 = Object.assign({}, task);
    task2.scheduled = !task2.scheduled;
    delete task2._uuid;
    await axios.put(`/tasks/${task._uuid}`,task2);
    let res = await axios.get(`/tasks`);
    setTasks(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get("/tasks");
      setTasks(res.data.items);
      setLoading(false);
      // console.log(res.data)
    })();
  }, []);

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
                <Link href={`/EditTask/${task._uuid}`} ><img src="./icons/pen.svg" /></Link>
               <img src="./icons/delet.svg" onClick={()=>deleteTask(task)}  />
               <img src="./icons/checkcircle.svg"   onClick={()=>scheduledTask(task)} className={task.scheduled ? "scheduled" : ""}/>
             </div>
           </div>))}
           </div>}
           <div>
        <div className="add-todo-button">
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
