import React, { Component } from 'react';
import { PanelGroup } from 'react-bootstrap';
import {Task} from '../Task/Task.js';
import FlipMove from 'react-flip-move';

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {taskComponents: this.generateTaskComponents(this.props.tasks)};
        setInterval(() => {
            this.props.tasks.sort((a, b) => 
                        //this.calculateTimeProgress(a) - this.calculateTimeProgress(b)
                        .5-Math.random()
                    );
            var taskComponents = this.generateTaskComponents(this.props.tasks);
            this.setState({taskComponents: taskComponents});
        }, 1000);
    }

    generateTaskComponents(tasks) {
        return tasks.map(t => <Task params={t}
                                    key={"task_"+t.id}
                                    timeProgress={this.calculateTimeProgress(t)} />);
    }

    calculateTimeProgress(task) {
        var elapsed = new Date() - task.startDate;
        var total = task.deadlineDate - task.startDate;
        return Math.min(100, 100*elapsed/total);
    }
    render() {
        return (
            <PanelGroup>
                <FlipMove duration={750} easing="ease-out">
                    {this.state.taskComponents}
                </FlipMove>
            </PanelGroup>
        );
    }
}

export { TaskContainer };
