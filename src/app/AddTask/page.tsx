"use client";
import React, { useState } from "react";
import Nav from "@/component/Navbar/index";
import Form from "@/component/TaskForm";
import { taskDef } from "@/component/types";
import axios from "@/component/api";
import Spinner from "@/component/Spinner";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const save = async(task: taskDef) => {
    setLoading(true)
      const res = await axios.post("/tasks",[task]);
      setLoading(false)
      router.push('/');
  };
  
  return (
    <main>
      <Nav title="Add Task" backbtn={true} />
      { loading ? ( <Spinner/> ) : (<Form submitBtnLable="ADD" onSave={save}/>)}
    </main>
  );
}