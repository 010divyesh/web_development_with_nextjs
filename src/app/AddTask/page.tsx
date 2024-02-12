"use client";
import React, { useState } from "react";
import Nav from "@/component/Navbar/index";
import Form from "@/component/TaskForm";
import { taskDef } from "@/component/types";
import { saveTasksToLocal, getTaskFromLocal } from "@/component";

export default function AddTask() {
  
  const save = (task: taskDef) => {
    let tasks = [];
    if (localStorage.tasks) {
      tasks = getTaskFromLocal();
    }
    tasks.push(task);
    saveTasksToLocal(tasks);
  };

  return (
    <main>
      <Nav title="Add Task" backbtn={true} />
      <Form submitBtnLable="ADD" onSave={save}/>
    </main>
  );
}