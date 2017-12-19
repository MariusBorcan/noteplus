import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

class Topbar extends Component{
    
        constructor(...args) {
        super(...args)
        this.state = {
            showProjectModal: false,
            showNoteModal: false,
            project: {
                name:"",
                description:"",
                url:""
            },
            note: {
                projectId:"",
                title:"",
                text:""
            }
        }
        this.closeProjectModal = this.closeProjectModal.bind(this);
        this.openProjectModal = this.openProjectModal.bind(this);
        this.closeNoteModal = this.closeNoteModal.bind(this);
        this.openNoteModal = this.openNoteModal.bind(this);
        this.validateProject = this.validateProject.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.updateProjectUrl = this.updateProjectUrl.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.updateProjectDescription = this.updateProjectDescription.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);
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
    
    validateProject() {
        var endpoint = this.state.project.url.replace('https://', '').replace('www.', '').replace('github.com', '')
        var url = 'https://api.github.com/repos' + endpoint
        axios.get(url)
        .then(response => {
            this.setState({
                project: {
                    name: response.data.full_name,
                    description: response.data.description,
                    url: url
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    submitProject() {
        this.props.submitProject(this.state.project);
        this.closeProjectModal();
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
        var oldProject = this.state.project;
        oldProject.url = event.target.value;
        this.setState({
            project:oldProject
        })
    }
    
    updateProjectName(event){
        var oldProject = this.state.project;
        oldProject.name = event.target.value;
        this.setState({
            project:oldProject
        })
    }
    
    updateProjectDescription(event){
        var oldProject = this.state.project;
        oldProject.description = event.target.value;
        this.setState({
            project: oldProject
        })
    }

    updateNoteTitle(event){
        this.setState({
            note: {
                title: event.target.value
            }
        })
    }
    
    updateNoteText(event){
        this.setState({
            note: {
                text: event.target.value
            }
        })
    }
    
    render() {
        return (
            <div className="col-sm-12 topbar">
                <p class="logo">Noteplus</p>
                <Dropdown>
                    <Dropdown.Toggle bsStyle="" className="button-no-style button-action">
                        <Glyphicon glyph="glyphicon glyphicon-plus" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu> 
                        <MenuItem eventKey="1" bsStyle="" onSelect={this.openProjectModal}
                            className="button-no-action">New project</MenuItem>
                        <MenuItem eventKey="2" bsStyle="" onSelect={this.openNoteModal}
                        className="button-no-action">New note</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Modal show={this.state.showProjectModal} onHide={this.closeProjectModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input onChange={this.updateProjectUrl} className="form-control" placeholder="Your project URL..."/>  
                            </FormGroup>
                             <FormGroup>
                                <input readonly="readonly" onChange={this.updateProjectName} value={this.state.project.name} className="form-control" placeholder="Your project name..."/>  
                            </FormGroup>
                            <FormGroup>
                                <textarea onChange={this.updateProjectDescription} value={this.state.project.description} className="form-control" placeholder="Your project description..."/>  
                            </FormGroup>
                             <Button onClick={this.validateProject} className="btn btn-primary btn-block">Load</Button>
                             <Button onClick={this.submitProject} className="btn btn-success btn-block">Save</Button>
                             <Button onClick={this.closeProjectModal} className="btn btn-danger btn-block">Cancel</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <Modal show={this.state.showNoteModal} onHide={this.closeNoteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input onChange={this.updateNoteTitle} className="form-control" placeholder="Your note title"/>  
                            </FormGroup>
                             <FormGroup>
                                <input readonly="readonly" onChange={this.updateNoteTitle} value={this.state.project.name} className="form-control" placeholder="Your project name..."/>  
                            </FormGroup>
                             <Button onClick={this.submitProject} className="btn btn-success btn-block">Save</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Topbar