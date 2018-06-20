import React from "react";
import propTypes from "prop-types";
import Button from "./Button";

const Footer = ({ taskList = [] }) => {
  const tasksRemaining = taskList.filter(task => !task.isComplete).length;
  return (
    <footer>
      <span>
        <strong>{tasksRemaining}</strong>
        {` item${tasksRemaining === 1 ? "" : "s"} left`}
      </span>
      <Button text="All" />
      <Button text="Active" />
      <Button text="Complete" />
    </footer>
  );
};

Footer.propTypes = {
  taskList: propTypes.array.isRequired
};

export default Footer;
