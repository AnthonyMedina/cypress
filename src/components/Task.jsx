import React from "react";
import propTypes from "prop-types";
import Button from "./Button.jsx";

const Task = ({ task }) => (
  <li className="task">
    <span>{task.text}</span>
    <Button text="X" />
  </li>
);

Task.propTypes = {
  task: propTypes.shape({
    id: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
    isComplete: propTypes.bool.isRequired
  }).isRequired
};

export default Task;
