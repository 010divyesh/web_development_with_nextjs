"use client";
import Nav from "@/component/Navbar";
import Form from "@/component/TaskForm";
import { taskDef } from "@/component/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/component/api";
import { useRouter } from "next/navigation";
import Spinner from "@/component/Spinner";

export default function EditTask() {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<taskDef>({ title: "", detail: "" });
  const router = useRouter();

  let { id } = useParams();

  let fetchData = async () => {
    setLoading(true);
    let res = await axios.get(`/tasks/${id}`);
    setTask(res.data);
    setLoading(false);
  };

  let save = async (task: taskDef) => {
    setLoading(true);
    await axios.put(`/tasks/${id}`, task);
    setLoading(false);
    router.push("/");
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <main>
      <Nav title="Edit Task" backbtn={true} />
     {!loading && <Form submitBtnLable="UPDATE" onSave={save} task={task} />}
      {loading && <Spinner/>}
    </main>
  );
}
