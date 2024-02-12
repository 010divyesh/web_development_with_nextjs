import { taskDef } from "./types";

export let saveTasksToLocal=(tasks : taskDef[])=>{
    localStorage.tasks = JSON.stringify(tasks);
}

export let getTaskFromLocal=()=>{
    return JSON.parse(localStorage.tasks);
}