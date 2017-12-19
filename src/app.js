//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'
import Authentication from './components/Authentication'
var APIManager = require('./utils/APIManager')

//this is like creating a new tag named App that we can use as html
class App extends Component {
    
    constructor() {
        super()
        this.state = {
            list: [],
            user: undefined
        }
        this.submitProject = this.submitProject.bind(this);
        this.userIsReady = this.userIsReady.bind(this);
    }
    
    submitProject(project) {
        let updatedList = Object.assign([], this.state.list)
        updatedList.push({name: project.name});
        console.log(updatedList)
        this.setState({
            list: updatedList
        })
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
                            
                            console.log(this.state.list);
                        }
                });
                    }
                });
            }
        });

    }
    
    render() {
        return (
            <div className="container-fluid">
            <Authentication userIsReady={this.userIsReady}/>
                <div className="row">
                    <Topbar submitProject={this.submitProject}/>
                </div>
                <div className="row">
                    <Sidebar projectsList={this.state.list}/>
                    <Note />
                </div>
            </div>
        )
    }
    
}

//render the code now
//we are rendering our custom App tag
//find the div with id of root and take over it with our App tag
ReactDOM.render(<App />, document.getElementById('root'))
