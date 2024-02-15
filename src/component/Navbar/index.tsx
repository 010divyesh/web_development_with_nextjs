import React, { useEffect, useState } from "react";
import "@/component/Navbar/style.css";

interface props {
  title: string;
  backbtn?: boolean;
  rightIcon?: "calender" | "battry";
}


function Nav({ title, backbtn, rightIcon }: props) {
  const[time,setTime]=useState({hour:"", minute:"", meridian:""})

  useEffect(()=>{
    const interval=setInterval(()=>{const date=new Date();
    const hour=date.getHours().toLocaleString();
    const minute=date.getMinutes().toLocaleString();
    const meridian = date.getHours()>= 12 ? "PM":"AM"
    setTime({hour,minute,meridian});
    },1000);   
    return () => clearInterval(interval);
  },[])
  return (
    <div className="app-bar">
      <div className="status-bar">
        <div className="left-section">{time.hour}:{time.minute} {time.meridian}</div>
        <div className="right-section">
          <img src="/icons/networkSignal.svg" />
          <img src="/icons/wifiSignal.svg" />
          <img src="/icons/battry.svg" />
        </div>
      </div>
      <div className="todo-page-title-bar">
        <div className="title-left-section">
          {backbtn && <img src="/icons/turnback.svg" />}
          <div className="app-name">{title}</div>
        </div>
        <div className="title-right-section">
          {rightIcon === "calender" && (<img src="./icons/calender.svg" className="calender" />)}
        </div>
      </div>
    </div>
  );
}

export default Nav;
