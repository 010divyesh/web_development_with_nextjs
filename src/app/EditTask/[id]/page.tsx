"use client";
import Nav from "@/component/Navbar";
import Form from "@/component/TaskForm";
import { taskDef } from "@/component/types";
import { saveTasksToLocal, getTaskFromLocal } from "@/component";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditTask() {
  const [task, setTask] = useState<taskDef>({ title: "", detail: "" });
  const [tasks, setTasks] = useState<taskDef[]>([]);

  let { id } = useParams();
  id = parseInt(id);

  let save = (task: taskDef) => {
    tasks[id].title = task.title;
    tasks[id].detail = task.detail;
    saveTasksToLocal(tasks);
  };

  useEffect(() => {
    if (localStorage.tasks) {
      let tasks2 = getTaskFromLocal();
      setTasks(tasks2);
      setTask(tasks2[id]);
    }
  }, [id]);

  return (
    <main>
      <Nav title="Edit Task" backbtn={true} />
      <Form submitBtnLable="UPDATE" onSave={save} task={task} />
    </main>
  );
}
