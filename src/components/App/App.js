import React, { Component } from 'react';
import './App.css';
import { TaskContainer } from '../TaskContainer/TaskContainer.js';
import { TaskForm } from '../TaskForm/TaskForm.js';
import { generateId } from '../../utils/id.js';
import { Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
          tasks: [
            {
              name: "Task 1",
              priority: 3,
              description: "This is only a test task",
              startDate:    new Date(2017, 7, 12, 16, 10),
              deadlineDate: new Date(2017, 7, 12, 16, 54),
              id: generateId(),
              isComplete: false
            },
            {
              name: "Task 2",
              priority: 1,
              description: "This is only a test task",
              startDate:    new Date(2017, 7, 12, 15, 44),
              deadlineDate: new Date(2017, 7, 12, 20, 48),
              id: generateId(),
              isComplete: false
            },
            {
              name: "Task 3",
              priority: 5,
              description: "This is only a test task",
              startDate:    new Date(2017, 7, 12, 15, 44),
              deadlineDate: new Date(2017, 7, 13, 11, 48),
              id: generateId(),
              isComplete: false
            },
            {
              name: "Task 4",
              priority: 4,
              description: "This is only a test task",
              startDate:    new Date(2017, 7, 12, 15, 44),
              deadlineDate: new Date(2017, 7, 13, 20, 48),
              id: generateId(),
              isComplete: false
            },
            {
              name: "Task 5",
              priority: 0,
              description: "This is only a test task",
              startDate:    new Date(2017, 7, 12, 15, 44),
              deadlineDate: new Date(2017, 7, 14, 12, 30),
              id: generateId(),
              isComplete: false
            },
          ]
        };

    }

    handleTaskAdded(task) {
      var newState = this.state;
      newState.tasks.push({
        name: task.name,
        priority: task.priority,
        description: task.description,
        startDate: new Date(),
        deadlineDate: task.deadline,
        id: generateId(),
        isComplete: false
      });
      this.setState(newState);
    }

    render() {
      return (
        <div className="App">
          <Row>
            <Col md={12}>
              <TaskForm onTaskAdded={this.handleTaskAdded.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TaskContainer tasks={this.state.tasks} />
            </Col>
          </Row>
        </div>
      );
    }
}

export { App };
