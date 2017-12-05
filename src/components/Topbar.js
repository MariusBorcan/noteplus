import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class Topbar extends Component{
    
        constructor() {
        super()
        this.state = {
            showProjectModal: false,
            showNoteModal: false,
            projectName: "",
            projectUrl: "",
            projectDescription: ""
        }
        this.closeProjectModal = this.closeProjectModal.bind(this);
        this.openProjectModal = this.openProjectModal.bind(this);
        this.closeNoteModal = this.closeNoteModal.bind(this);
        this.openNoteModal = this.openNoteModal.bind(this);
    }
    
    closeProjectModal() {
        this.setState({
            showProjectModal: false
        });
    }
    
    openProjectModal() {
        this.setState({
            showProjectModal: true
        });
    }
    
    closeNoteModal() {
        this.setState({
            showNoteModal: false
        });
    }
    
    openNoteModal() {
        this.setState({
            showNoteModal: true
        });
    }
    
    updateProjectUrl(event){
        this.setState({
            projectUrl: event.target.value
        })
    }
    
    updateProjectName(event){
        this.setState({
            projectName: event.target.value
        })
    }
    
    updateProjectDescription(event){
        this.setState({
            projectDescription: event.target.value
        })
    }
    
    render() {

        return (
            <div className="col-sm-9">
                <Dropdown>
                    <Dropdown.Toggle bsStyle="" className="button-no-style button-action">
                        <Glyphicon glyph="glyphicon glyphicon-plus" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu> 
                        <MenuItem eventKey="1" bsStyle="" onSelect={this.openProjectModal}
                            className="button-no-style button-action">New project</MenuItem>
                        <MenuItem eventKey="2" bsStyle="" onSelect={this.openNoteModal}
                        className="button-no-style button-action">New note</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Modal show={this.state.showProjectModal} onHide={this.closeProjectModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input onChange={this.updateProjectUrl.bind(this)} className="form-control" placeholder="Your project URL..."/>  
                            </FormGroup>
                             <FormGroup>
                                <input readonly="readonly" onChange={this.updateProjectName.bind(this)} className="form-control" placeholder="Your project name..."/>  
                            </FormGroup>
                            <FormGroup>
                                <textarea readonly="readonly" onChange={this.updateProjectDescription.bind(this)} className="form-control" placeholder="Your project description..."/>  
                            </FormGroup>
                             <Button className="btn btn-success btn-block">Load</Button>
                             <Button onClick={this.closeProjectModal} className="btn btn-danger btn-block">Cancel</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <Modal show={this.state.showNoteModal} onHide={this.closeNoteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Note body
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Topbar