import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ButtonToolbar } from 'react-bootstrap'
import ErrorModal from './ErrorModal'
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
            },
            projectsList: [],
            selectedProjectId: 0,
            selectedProjectName: "Select a project",
            showErrorModal: false,
            errorModalMessage: ""
        }
        this.closeProjectModal = this.closeProjectModal.bind(this);
        this.openProjectModal = this.openProjectModal.bind(this);
        this.closeNoteModal = this.closeNoteModal.bind(this);
        this.openNoteModal = this.openNoteModal.bind(this);
        this.validateProject = this.validateProject.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.updateProjectUrl = this.updateProjectUrl.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.updateProjectDescription = this.updateProjectDescription.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);
        this.updateSelectedProject = this.updateSelectedProject.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
    }
    
    closeProjectModal() {
        this.setState({
            showProjectModal: false
        });
    }
    
    openProjectModal() {
        this.setState({
            showProjectModal: true,
            project: {
                name:"",
                description:"",
                url:""
            }
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
        //get all the projects
        this.setState({
            projectsList: this.props.projectsList,
            selectedProjectId: this.props.projectsList.length > 0 ? this.props.projectsList[0].id : 0,
            selectedProjectName: this.props.projectsList.length > 0 ? this.props.projectsList[0].title : "Select a project"
        });
        this.setState({
            showNoteModal: true,
            note: {
                projectId:"",
                title:"",
                text:""
            }
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
    
    updateSelectedProject(eventKey) {
        //eventKey holds the project id
        //find the selected project
        for(var index in this.state.projectsList) {
            if(this.state.projectsList[index].id == eventKey) {
                this.setState({
                    selectedProjectId: eventKey,
                    selectedProjectName: this.state.projectsList[index].title
                });
            }
        }
    }
    
    showErrorModal(message){
        this.setState({
            errorModalMessage: message,
            showErrorModal: true
        });
    }
    
    closeErrorModal() {
        this.setState({
            showErrorModal:false
        })
    }
    
    submitNote() {
        var validated = true;
        if(this.state.selectedProjectId==0) {
            validated = false;
            this.showErrorModal("You have not selected any project. If your project list is empty, you first need to add a project, and then add a note.");
        }
        if(this.state.note.title == "") {
            validated = false;
            this.showErrorModal("Your note needs to have a title to start.");
        }
        if(validated==true) {
            const newNote = {
                projectId: this.state.selectedProjectId,
                title: this.state.note.title,
                text: "Your note text..."
            }
            this.props.submitNote(newNote);
            this.closeNoteModal();
        }
    }
    
    render() {
        const dropdownItems = this.props.projectsList.map((project, i) => {
            return (
                    <MenuItem className=" select-project" eventKey={project.id}>{project.title}</MenuItem>
                );
        })
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
                                <ButtonToolbar>
                                    <DropdownButton onSelect={this.updateSelectedProject} bsSize="large" className=" select-project" title={this.state.selectedProjectName} id="dropdown-size-large">
                                        {dropdownItems}
                                    </DropdownButton>
                                </ButtonToolbar>
                            </FormGroup>
                             <Button onClick={this.submitNote} className="btn btn-success btn-block">Save</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <ErrorModal showErrorModal={this.state.showErrorModal} closeErrorModal={this.closeErrorModal} errorModalMessage={this.state.errorModalMessage}/>
            </div>
        )
    }
}

export default Topbar