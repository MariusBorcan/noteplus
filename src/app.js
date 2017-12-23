//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'
import MessageModal from './components/modals/MessageModal'
import ConfirmationModal from './components/modals/ConfirmationModal'
import UserModal from './components/modals/UserModal'
import Authentication from './components/Authentication'
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
var APIManager = require('./utils/APIManager')

//this is like creating a new tag named App that we can use as html
class App extends Component {
    
    constructor() {
        super()
        this.state = {
            list: [],
            user: undefined,
            currentNote: undefined,
            showProjectModal:false,
            showConfirmationModal: false,
            showMessageModal: false,
            showUserModal: false,
            messageModalMessage: "",
            messageModalBody: "",
            confirmationModalMessage: "",
            selectedProject: {
                id: 0,
                name:"",
                description: "",
                url: ""
            },
            deleteArguments: {
                id: 0,
                type: ""
            }
        }
        this.submitProject = this.submitProject.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.userIsReady = this.userIsReady.bind(this);
        this.displayNote = this.displayNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.editProject = this.editProject.bind(this);
        this.showProjectModal = this.showProjectModal.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.showMessageModal = this.showMessageModal.bind(this);
        this.closeProjectModal = this.closeProjectModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.closeMessageModal = this.closeMessageModal.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.updateProjectDescription = this.updateProjectDescription.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.deleteConfirmed = this.deleteConfirmed.bind(this);
        this.deleteCancelled = this.deleteCancelled.bind(this);
        this.showUserModal = this.showUserModal.bind(this);
        this.closeUserModal = this.closeUserModal.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    submitProject(project) {
        //prepare the project
        const newProject = {
            userId: this.state.user.id,
            title: project.name,
            description: project.description,
            githubUrl: project.url
        }
        //add the project to the database
        APIManager.post('/api/projects/', newProject, (err, res) => {
            if(err) {
                alert('ERROR: ' + err);
                console.log(err);
                return
            } else {
                        
                var oldList = this.state.list;
                oldList.push(res.project);
                this.setState({
                    list: oldList
                });
            }
        });

    }
    
    submitNote(note) {
        //add the note to the database
        APIManager.post('/api/notes/', note, (err, res) => {
            if(err) {
                alert('ERROR: ' + err);
                console.log(err);
                return
            } else {
                //update page information
                    
                    for(var index in this.state.list) {
                        if(note.projectId == this.state.list[index].id){
                            if(this.state.list[index].notes == undefined) {
                                this.state.list[index].notes = [];
                                this.state.list[index].notes.push(res.note);
                            } else {
                                this.state.list[index].notes.push(res.note);
                            }
                        }
                    }
                    this.setState({
                        list:this.state.list
                    });
            }
        });
    }
    
    userIsReady() {
        //get the username
        APIManager.get('/api/token/fetch', null, (error, response) => {
            if(error) {
                alert('ERROR: ' + error);
                console.log(error);
                return
            }else {
                //get the user information
                APIManager.get('/api/users/info/'+response.name, null, (err, res) => {
                    if(err) {
                        alert('ERROR: ' + err);
                        console.log(err);
                        return
                    }else {
                        this.setState({
                            user: res.user
                        });
                        //get the projects list
                        APIManager.get('/api/users/'+this.state.user.id+'/projects', null, (e, r) => {
                        if(e) {
                            alert('ERROR: ' + e);
                            console.log(e);
                            return
                        }else {
                            this.setState({
                                list: r.projects
                            });
                            
                            const newList = this.state.list;
                            //attach notes list to projects list
                            for(var index in this.state.list){
                                        APIManager.get('/api/projects/' + this.state.list[index].id + '/notes', null, (error, response) => {
                                            if(error) {
                                                alert('ERROR: ' + error);
                                                console.log(error);
                                                return
                                            }else {
                                                
                                                if(response.notes.length > 0) {
                                                    //find where to put the incoming notes
                                                    for(var index2 in newList) {
                                                        if(newList[index2].id == response.notes[0].projectId)
                                                            newList[index2].notes = response.notes;
                                                    }                                                    
                                                }
                                            }
                                        }); 
                            }
                            this.setState({
                                list: newList
                            });
                        }
                });
                    }
                });
            }
        });

    }
    
    displayNote(newNote) {
        this.setState({
            currentNote: newNote
        });
    }
    
    saveNote(note) {
        APIManager.put('/api/notes/'+note.id+'/', note, (err, res) => {
            if(err) {
                alert('ERROR: ' + err);
                console.log(err);
                return
            }
        });
        for(var index in this.state.list) {
            for(var index2 in this.state.list[index].notes) {
                if(this.state.list[index].notes[index2].id == note.id) {
                    this.state.list[index].notes[index2] = note;
                }
            }
        }
        this.setState({
            list:this.state.list
        });
    }
    
    editProject(projectId) {
        
        APIManager.get('/api/projects/'+projectId , null, (error, response) => {
                    if(error) {
                        alert('ERROR: ' + error)
                        console.log(error)
                        return
                    }
                    else {
                        this.setState({
                            selectedProject:{
                                id: projectId,
                                name:response.project.title,
                                description: response.project.description,
                                url: response.project.githubUrl
                            }
                        });
                        this.showProjectModal();
                    }
        });
    }
    
    showProjectModal() {
        this.setState({
            showProjectModal:true
        })
    }
    
    showConfirmationModal(){
        this.setState({
            showConfirmationModal:true
        })
    }
    
    showMessageModal(title, body){
        this.setState({
            messageModalTitle: title,
            messageModalBody: body,
            showMessageModal: true
        });
    }
    
    closeProjectModal() {
        this.setState({
            showProjectModal:false
        })
    }
    
    closeConfirmationModal(){
        this.setState({
            showConfirmationModal:false
        })
    }
    
    closeMessageModal(){
        this.setState({
            showMessageModal:false
        })
    }
    
    updateProjectName(event){
        var oldProject = this.state.selectedProject;
        oldProject.name = event.target.value;
        this.setState({
            project:oldProject
        })
    }
    
    updateProjectDescription(event){
        var oldProject = this.state.selectedProject;
        oldProject.description = event.target.value;
        this.setState({
            project: oldProject
        })
    }
    
    updateProject() {
        var validated = true;
        if(this.state.selectedProject.name.length<5) {
            validated = false;
            this.showMessageModal("Error", "Your project name should be at least 5 characters long.");
        }
        if(validated==true) {
            const newProject = {
                title: this.state.selectedProject.name,
                description: this.state.selectedProject.description,
                githubUrl: this.state.selectedProject.url
            }
            APIManager.put('/api/projects/'+this.state.selectedProject.id+'/', newProject, (err, res) => {
                if(err) {
                    alert('ERROR: ' + err);
                    console.log(err);
                    return
                } else {
                    for(var index in this.state.list) {
                        if(this.state.selectedProject.id == this.state.list[index].id){
                            this.state.list[index].title = newProject.title;
                            this.state.list[index].description = newProject.description;
                            this.state.list[index].githubUrl = newProject.githubUrl;
                        }
                    }
                    this.setState({
                        list:this.state.list
                    });
                }
            });
            this.closeProjectModal();
        }
    }
    
    deleteProject() {
        var projectName = "";
        for(var index in this.state.list) {
            if(this.state.list[index].id == this.state.currentNote.projectId) {
                projectName = this.state.list[index].title;
            }
        }
        this.setState({
            deleteArguments: {
                id: this.state.currentNote.projectId,
                type: "project"
            }, 
            confirmationModalMessage: 'Are you sure you want to delete project "' + projectName + '"?',
            showConfirmationModal: true,
        });
    }
    
    deleteNote() {
        this.setState({
            deleteArguments: {
                id: this.state.currentNote.id,
                type: "note"
            }, 
            confirmationModalMessage: 'Are you sure you want to delete note "' + this.state.currentNote.title + '"?',
            showConfirmationModal: true,
        });
    }
    
    deleteConfirmed(){
        this.setState({
            showConfirmationModal: false
        });
        if(this.state.deleteArguments.type == "project") {
            APIManager.delete('/api/projects/' + this.state.deleteArguments.id, null, (error, response) => {
                if(error) {
                    alert('ERROR: ' + error);
                    console.log(error);
                    this.setState({
                        messageModalTitle: "Error",
                        messageModalBody: "An error has occurred while deleting.",
                        showErrorModal:true
                    });
                    return;
                    }else {
                        //eliminate the project from the list
                        var newList = [];
                        for(var index in this.state.list) {
                            if(this.state.list[index].id != this.state.deleteArguments.id) {
                                newList.push(this.state.list[index]);
                            }
                        }
                        this.setState({
                            list:newList, 
                            messageModalTitle: "Success",
                            messageModalBody: "Your project has been deleted.",
                            showMessageModal: true
                        });
                    }
            });            
       }else if(this.state.deleteArguments.type == "note") {
            APIManager.delete('/api/notes/' + this.state.deleteArguments.id, null, (error, response) => {
                if(error) {
                    alert('ERROR: ' + error);
                    console.log(error);
                    this.setState({
                        messageModalTitle: "Error",
                        messageModalBody: "An error has occurred while deleting.",
                        showErrorModal:true
                    });
                    return;
                    }else {
                        //eliminate the note from the list
                        var newList = [];
                        for(var index in this.state.list) {
                            var newNotes = [];
                            for(var index2 in this.state.list[index].notes) {
                                if(this.state.list[index].notes[index2].id != this.state.deleteArguments.id) {
                                    newNotes.push(this.state.list[index].notes[index2]);
                                }
                            }
                            this.state.list[index].notes = newNotes;
                        }
                        this.setState({
                            list: this.state.list,
                            messageModalTitle: "Success",
                            messageModalBody: "Your note has been deleted.",
                            showMessageModal: true
                        });
                    }
            });           
       }
       this.setState({
           currentNote: undefined
       });
    }
    
    deleteCancelled(){
        this.setState({
            deleteArguments: {
                id: 0,
                type: ""
            },
            showConfirmationModal: false
        });
    }
    
    showUserModal(){
        this.setState({
            showUserModal:true
        });
        
    }
    
    closeUserModal(){
        this.setState({
            showUserModal: false
        });
    }
    
    logout(){
        APIManager.delete('/api/token/', null, (error, response) => {
                if(error) {
                    alert('ERROR: ' + error);
                    console.log(error);
                } else {
                   window.location.reload(); 
                }
        });
    }
    
    render() {
        return (
            <div className="container-fluid">
            <Authentication userIsReady={this.userIsReady}/>
                <div className="row">
                    <Topbar submitProject={this.submitProject} submitNote={this.submitNote} projectsList={this.state.list} 
                    currentNote={this.state.currentNote} editProject={this.editProject} deleteProject={this.deleteProject} deleteNote={this.deleteNote}
                    user={this.state.user} showUserModal={this.showUserModal}/>
                </div>
                <div className="row">
                    <Sidebar projectsList={this.state.list} displayNote={this.displayNote}/>
                    <Note currentNote = {this.state.currentNote} saveNote= {this.saveNote}/>
                </div>
                <Modal show={this.state.showProjectModal} onHide={this.closeProjectModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input readonly="readonly" value={this.state.selectedProject.url} className="form-control" placeholder="Your project URL..."/>  
                            </FormGroup>
                             <FormGroup>
                                <input onChange={this.updateProjectName} value={this.state.selectedProject.name} className="form-control" placeholder="Your project name..."/>  
                            </FormGroup>
                            <FormGroup>
                                <textarea onChange={this.updateProjectDescription} value={this.state.selectedProject.description} className="form-control" placeholder="Your project description..."/>  
                            </FormGroup>
                             <Button onClick={this.updateProject} className="btn btn-success btn-block">Save</Button>
                             <Button onClick={this.closeProjectModal} className="btn btn-danger btn-block">Cancel</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <MessageModal showMessageModal={this.state.showMessageModal} closeMessageModal={this.closeMessageModal} 
                            messageModalBody={this.state.messageModalBody} messageModalTitle={this.state.messageModalTitle}/>
                <ConfirmationModal showConfirmationModal={this.state.showConfirmationModal} closeConfirmationModal={this.closeConfirmationModal} 
                confirmationModalMessage={this.state.confirmationModalMessage} deleteConfirmed={this.deleteConfirmed} deleteCancelled={this.deleteCancelled}/>
                <UserModal showUserModal={this.state.showUserModal} closeUserModal={this.closeUserModal}
                        user={this.state.user} logout={this.logout}/>
            </div>
        )
    }
    
}

//render the code now
//we are rendering our custom App tag
//find the div with id of root and take over it with our App tag
ReactDOM.render(<App />, document.getElementById('root'))
