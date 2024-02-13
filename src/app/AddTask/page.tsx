"use client";
import React, { useState } from "react";
import Nav from "@/component/Navbar/index";
import Form from "@/component/TaskForm";
import { taskDef } from "@/component/types";
import { saveTasksToLocal, getTaskFromLocal } from "@/component";
import axios from "axios";
import Spinner from "@/component/Spinner";

export default function AddTask() {
  
  const [loading, setLoading] = useState(false);

  const save = async(task: taskDef) => {
    setLoading(true)
      const res = await axios.post(
        "https://crudcrud.com/api/8864861aca83475a82865ac299a7c9a1/task",task
      );
      setLoading(false)
  };

  return (
    <main>
      <Nav title="Add Task" backbtn={true} />
      <Form submitBtnLable="ADD" onSave={save}/>
      {loading && <Spinner/>}
    </main>
  );
}