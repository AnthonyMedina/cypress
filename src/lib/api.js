import axios from "axios";

export const saveTask = task =>
  axios.post("http://localhost:3000/api/tasks", task);

export const loadTasks = () => axios.get("http://localhost:3000/api/tasks");
