import React, { Component } from 'react';
import { Button, Col, Modal, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import DateTime from 'react-datetime';
import ReactStars from 'react-stars';
import './DateTime.css';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, deadline: null};
        this.defaultInputs = {
            name: {
                value: null,
                required: true,
            },
            description: {
                value: null,
                required: false
            },
            priority: {
                value: 2.5,
                required: true
            },
            deadline: {
                value: null,
                required: true
            }
        };
        this.inputs = this.defaultInputs;
    }
    render() {
        return (
        <div className="taskForm">
            <Button className="pull-right"
                    bsStyle="primary"
                    onClick={() => this.setState({showModal: true})}><FontAwesome name="plus" /></Button>

            <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
            <Modal.Header closeButton>
                <Modal.Title>Add new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form horizontal onSubmit={this.handleFormSubmit.bind(this)}>
                <FormGroup  controlId="nameFormGroup">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl    type="text"
                                        placeholder="Task name"
                                        required
                                        onChange={e => this.inputs.name.value = e.target.value}
                                        />
                    </Col>
                </FormGroup>

                <FormGroup  controlId="descriptionFormGroup">
                    <Col componentClass={ControlLabel} sm={2}>
                        Description
                    </Col>
                    <Col sm={10}>
                        <FormControl    componentClass="textarea"
                                        placeholder="Task description"
                                        onChange={e => this.inputs.description.value = e.target.value} />
                    </Col>
                </FormGroup>


                <FormGroup  controlId="deadlineFormGroup">
                    <Col componentClass={ControlLabel} sm={2}>
                        Deadline
                    </Col>
                    <Col sm={10}>
                        <DateTime   
                                    onChange={this.handleDeadlineChange.bind(this)}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm:ss"
                                    isValidDate={date => date.isAfter(DateTime.moment().subtract(1, 'day'))}
                                    value={this.state.deadline}
                                    inputProps={{required: "required"}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="priorityFormGroup">
                    <Col componentClass={ControlLabel} sm={2}>
                        Priority
                    </Col>
                    <Col sm={10}>
                        <ReactStars count={5}
                                    value={this.defaultInputs.priority.value}
                                    size={30}
                                    onChange={val => this.inputs.priority.value = val}
                                    />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">
                        Add
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            </Modal.Body>
            </Modal>
        </div>
        );
    }


    handleDeadlineChange(value) {
        var currDate = DateTime.moment().add(10, 'seconds');
        if(!value.isBefore) {
            value = currDate;
        }
        if(value.isBefore(currDate)){
            value = currDate;
        }
        var newState = this.state;
        newState.deadline = value;
        this.setState(newState); 
        this.inputs.deadline.value = value;
    }
    handleFormSubmit(p) {
        p.preventDefault();
        var isValid = true;
        for(var property in this.inputs) {
            if(this.inputs.hasOwnProperty(property)) {
                var input = this.inputs[property];
                if(!input.required) {
                    continue;
                }
                isValid &= input.value ? true : false;
            }
        }
        if(!isValid) {
            return;
        }
        var task = {
            name: this.inputs.name.value,
            description: this.inputs.description.value,
            deadline: this.inputs.deadline.value,
            priority: this.inputs.priority.value
        }
        this.inputs = this.defaultInputs;
        this.props.onTaskAdded(task);
        this.setState({showModal: false, deadline: null});
    }
}

export { TaskForm };
