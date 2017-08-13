import React, { Component } from 'react';
import { Panel, Table, ProgressBar, Row, Col } from 'react-bootstrap';
import ReactStars from 'react-stars';
import dateFormat from 'dateformat';

class Task extends Component {
    constructor(props) {
        super(props);
        this.name         = props.params.name;
        this.description  = props.params.description;
        this.priority     = props.params.priority;
        this.startDate    = props.params.startDate;
        this.deadline     = props.params.deadlineDate;
        this.id           = props.params.id;
        this.dateFormat   = "yyyy-mm-dd HH:MM:ss";
    }
    render() {
        const isLate = this.props.timeProgress === 100;
        const title = (
            <Row>
                <Col md={3}>
                    <h3><b>{this.name}</b></h3>
                </Col>
                <Col md={9}>
                    <ProgressBar
                        now={this.props.timeProgress} 
                        bsStyle={!isLate ? "info" : "danger"}/>
                        {/*
                    <span className="pull-right">Deadline: <b>{dateFormat(this.deadline, this.dateFormat)}</b></span>
                    */}
                </Col>
            </Row>
        )
        return (
            <Panel  collapsible
                    bsStyle={!isLate ? "primary" : "danger"}
                    header={title}
                    className="taskPanel">
                <Table responsive={true}>
                    <tbody>
                        <tr>
                            <th>Description</th>
                            <td>{this.description || ""}</td>
                        </tr>
                        <tr>
                            <th>Priority</th>
                            <td><ReactStars edit={false} count={5} value={this.priority} size={50} /></td>
                        </tr>
                        <tr>
                            <th>Deadline</th>
                            <td>{dateFormat(this.deadline, this.dateFormat)}</td>
                        </tr>
                        <tr>
                            <th>Started on</th>
                            <td>{dateFormat(this.startDate, this.dateFormat)}</td>
                        </tr>
                        <tr>
                            <th>Progress</th>
                            <td><ProgressBar
                                        now={this.props.timeProgress} 
                                        bsStyle={!isLate ? "info" : "danger"}/></td>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <td>{this.id}</td>
                        </tr>
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export { Task };
