//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'
import ErrorModal from './components/ErrorModal'
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
            showErrorModal: false,
            errorModalMessage: "",
            confirmationModalMessage: "",
            selectedProject: {
                id: 0,
                name:"",
                description: "",
                url: ""
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
        this.showErrorModal = this.showErrorModal.bind(this);
        this.closeProjectModal = this.closeProjectModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.updateProjectDescription = this.updateProjectDescription.bind(this);
        this.updateProject = this.updateProject.bind(this);
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
    
    showErrorModal(message){
        this.setState({
            errorModalMessage: message,
            showErrorModal: true
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
    
    closeErrorModal(){
        this.setState({
            showErrorModal:false
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
            this.showErrorModal("Your project name should be at least 5 characters long.");
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
    
    render() {
        return (
            <div className="container-fluid">
            <Authentication userIsReady={this.userIsReady}/>
                <div className="row">
                    <Topbar submitProject={this.submitProject} submitNote={this.submitNote} projectsList={this.state.list} 
                    currentNote={this.state.currentNote} editProject={this.editProject}/>
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
                <ErrorModal showErrorModal={this.state.showErrorModal} closeErrorModal={this.closeErrorModal} errorModalMessage={this.state.errorModalMessage}/>
            </div>
        )
    }
    
}

//render the code now
//we are rendering our custom App tag
//find the div with id of root and take over it with our App tag
ReactDOM.render(<App />, document.getElementById('root'))
