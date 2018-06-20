import React, { Component } from "react";
import * as api from "../lib/api";

class TaskAdder extends Component {
  state = {
    newTask: ""
  };
  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      <form>
        <input
          type="text"
          className="new-task"
          placeholder="What do you need to do?"
          // onChange={this.handleInputChange}
          // value={this.state.newTask}
        />
      </form>
    );
  }
  handleInputChange = ({ target: { value } }) => {
    this.updateTask(value);
  };
  updateTask = newTask => {
    this.setState({ newTask });
  };
  handleSubmit = e => {
    e.preventDefault();
    api.saveTask(e.target.value).then(({ data }) => this.props.addTask(data));
    this.setState({ newTask: "" });
  };
}

export default TaskAdder;
