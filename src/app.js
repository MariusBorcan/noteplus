//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'
import ErrorModal from './components/ErrorModal'
import Authentication from './components/Authentication'
var APIManager = require('./utils/APIManager')

//this is like creating a new tag named App that we can use as html
class App extends Component {
    
    constructor() {
        super()
        this.state = {
            list: [],
            user: undefined,
            currentNote: undefined
        }
        this.submitProject = this.submitProject.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.userIsReady = this.userIsReady.bind(this);
        this.displayNote = this.displayNote.bind(this);
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
            }
        });
        //update page information
        this.userIsReady();
    }
    
    submitNote(note) {
        //add the note to the database
        APIManager.post('/api/notes/', note, (err, res) => {
            if(err) {
                alert('ERROR: ' + err);
                console.log(err);
                return
            }
        });
        //update page information
        this.userIsReady();
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
    
    render() {
        return (
            <div className="container-fluid">
            <Authentication userIsReady={this.userIsReady}/>
                <div className="row">
                    <Topbar submitProject={this.submitProject} submitNote={this.submitNote} projectsList={this.state.list}/>
                </div>
                <div className="row">
                    <Sidebar projectsList={this.state.list} displayNote={this.displayNote}/>
                    <Note currentNote = {this.state.currentNote} />
                </div>
            </div>
        )
    }
    
}

//render the code now
//we are rendering our custom App tag
//find the div with id of root and take over it with our App tag
ReactDOM.render(<App />, document.getElementById('root'))
