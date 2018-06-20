import React, { Component } from "react";
import "./App.css";
import TaskAdder from "./components/TaskAdder";
import TaskList from "./components/TaskList.jsx";
import Footer from "./components/Footer.jsx";
import Error from "./components/Error.jsx";
import * as api from "./lib/api";

class App extends Component {
  state = {
    tasks: [
      // {
      //   id: 1,
      //   text: "Get a puppy",
      //   isComplete: false
      // }
    ],
    error: false
  };

  // componentDidMount() {
  //   api
  //     .loadTasks()
  //     .then(({ data }) => {
  //       this.setState({ tasks: data });
  //     })
  //     .catch(() => this.setState({ error: true }));
  // }

  render() {
    return (
      <div className="container">
        <h2>My Checklist</h2>
        <TaskAdder addTask={this.addTask} />
        {/* {this.state.error && <Error />} */}
        <TaskList taskList={this.state.tasks} />
        <Footer taskList={this.state.tasks} />
      </div>
    );
  }
  addTask = newTask => {
    const { tasks } = this.state;
    const tasksCopy = tasks.map(task => {
      return { ...task };
    });
    tasksCopy.push(newTask);
    this.setState({
      tasks: tasksCopy
    });
  };
}

export default App;
