import React from "react";
import Task from "./Task";
import propTypes from "prop-types";

const TaskList = ({ taskList = [] }) => (
  <ul className="taskList">
    {taskList.map(task => <Task task={task} key={task.id} />)}
  </ul>
);

TaskList.propTypes = {
  taskList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      text: propTypes.string.isRequired,
      isComplete: propTypes.bool.isRequired
    })
  ).isRequired
};

export default TaskList;
