import React, { Component } from 'react';
import { PanelGroup } from 'react-bootstrap';
import {Task} from '../Task/Task.js';

class TaskContainer extends Component {
    render() {
        var taskComponents = this.props.tasks.map(t => <Task params={t} key={"task_"+t.id} />);
        return (
            <PanelGroup>
                {taskComponents}
            </PanelGroup>
        );
    }
}

export { TaskContainer };
