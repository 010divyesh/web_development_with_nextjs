"use client";
import React, { useEffect, useState } from "react";
import { taskDef } from "@/component/types";
import Link from "next/link";


interface props{
  submitBtnLable?:string;
  task?:taskDef
  onSave:(task:taskDef)=> void;
}

export default function Form({submitBtnLable, onSave, task}:props) {
  const [detail, setDetail] = useState("");
  const [title, setTitle] = useState("");

  const save = (event: React.SyntheticEvent) => {
    let task: taskDef = { detail, title };
    event.preventDefault();
    onSave(task);
  };

  useEffect(()=>{
    if(task){
      setTitle(task.title);
      setDetail(task.detail)
    }
  },[task])

  return (
    <main>
      <form onSubmit={save}>
        <div className="add-page-main-container">
          <div className="add-main-container-text">Title</div>
          <div>
            <input
              type="text"
              name="title"
              className="input"
              required
              onChange={(event) => setTitle(event.currentTarget.value)}
              value={title}
            />
          </div>
          <div className="add-main-container-text-detail">Detail</div>
          <div>
            <input
              type="text"
              name="detail"
              className="input"
              required
              onChange={(event) => setDetail(event.currentTarget.value)}
              value={detail}
            />
          </div>
          <div id="add-btn-container" className="button-container">
            <button className="btn">{submitBtnLable}</button>
            <Link href="/" className="btn">
              CANCEL
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
